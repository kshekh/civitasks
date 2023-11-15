import { db } from "@database/setup";
import { JSONSchemaType } from "ajv";
import { NextFunction, Request, Response } from 'express';
import { sql } from "kysely";

export interface SearchParams {
  // Unix timestamp in milliseconds
  // ex. 1694641390000
  queryStart: string;
  nameQuery?: string;
  role?: string;
  skills?: string[];
  tracks?: string[];
  languages?: string[];
  country?: string;
  city?: string;
  lookingForCollab?: boolean;
  isUniversityStudent?: boolean;
  limit?: string;
  offset?: string;
};

export const searchSchema: JSONSchemaType<SearchParams> = {
  type: 'object',
  properties: {
    queryStart: { type: 'string' },
    nameQuery: { type: 'string', nullable: true },
    role: { type: 'string', nullable: true },
    skills: { type: 'array', nullable: true, items: { type: 'string' } },
    tracks: { type: 'array', nullable: true, items: { type: 'string' } },
    languages: { type: 'array', nullable: true, items: { type: 'string' } },
    country: { type: 'string', nullable: true },
    city: { type: 'string', nullable: true },
    lookingForCollab: { type: 'boolean', nullable: true },
    isUniversityStudent: { type: 'boolean', nullable: true },
    limit: { type: 'string', nullable: true },
    offset: { type: 'string', nullable: true },
  },
  required: ['queryStart'],
  additionalProperties: false,
};

export async function search(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      nameQuery,
      role,
      skills,
      tracks,
      languages,
      country,
      city,
      lookingForCollab,
      isUniversityStudent,
      queryStart,
      limit = '8',
      offset = '0'
    } = req.query as unknown as SearchParams;

    let searchQuery;

    // If it's a name query, just search by name (TODO - should this use fulltext matching?)
    // and ignore any other filters, because we assume that someone
    // searching by name is looking for a specific profile.
    if (nameQuery) {
      searchQuery = buildNamedUserQuery(queryStart, nameQuery);

    } else {
      // If it's a full query, we add role, skills, languages, etc.
      const coreUserQuery = buildCoreUserQuery(db, queryStart, skills, tracks, languages, country, city, lookingForCollab, isUniversityStudent);
      
      if (!role) {
        // If no role was specified, we _right_ join to get roles without filtering.
        // Ths is a bit convoluted because the coreUserQuery itself is
        // built with a bunch of inner joins. Tacking on another left join to that
        // was getting rejected by Kysely for some reason, so instead we package all that up
        // and right join it as a subquery to the outer roles bit.
        searchQuery = db
        .selectFrom('users_roles')
        .select([
          'inner_query.id',
          'first_name',
          'last_name',
          'city',
          'is_university_student',
          'current_position',
          'languages',
          'updated_at',
          sql`ARRAY_AGG(DISTINCT users_roles.role_name) AS roles` as any
      ])
      .rightJoin(
        coreUserQuery.as('inner_query'),
        (join) => join.onRef('inner_query.id', '=', 'users_roles.user_id')
        )
        // This won't work with just group by on id
        // Like the flattened version below
        .groupBy([
          'inner_query.id',
          'inner_query.first_name',
          'inner_query.last_name',
          'inner_query.city',
          'inner_query.is_university_student',
          'inner_query.current_position',
          'inner_query.languages',
          'inner_query.updated_at'
        ]);
      } else {
        // If there's a role specified then we get to inner join
        // on roles and filter that way, which is a bit simpler.
        // 
        // TODO - Unfortunately there's currently a bug here where we should
        // be returning all the user's roles for display, not only the
        // ones that match... but this is a good start.
        searchQuery = coreUserQuery
        .select(sql`ARRAY_AGG(DISTINCT users_roles.role_name) AS roles` as any)
        .innerJoin(
          'users_roles',
          (join) => join
          .onRef('users.id', '=', 'users_roles.user_id')
          .on('users_roles.role_name', '=', role)
          )
          .groupBy('users.id');
      } 
    }

    const results = await searchQuery
      // TODO - we can probably come up
      // with a better concept of relevancy here
      .orderBy('updated_at', 'desc')
      .limit(Number(limit))
      .offset(Number(offset))
      .execute();

    const profiles = results.map(user => ({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      city: user.city,
      roles: user.roles as string[], 
      isUniversityStudent: user.is_university_student,
      currentPosition: user.current_position,
      languages: user.languages
    }));

    res.status(200).json(profiles);

  } catch (err) {
    next(err);
  }
}

function buildNamedUserQuery(queryStart: string, nameQuery: string) {
  return db
    .selectFrom('users')
    .select([
      'users.id',
      'users.first_name',
      'users.last_name',
      'users.city',
      'users.is_university_student',
      'users.current_position',
      'users.languages',
      'users.updated_at',
      sql`ARRAY_AGG(DISTINCT users_roles.role_name) AS roles` as any
    ])
    .leftJoin('users_roles', 'users.id', 'users_roles.user_id')
    .where('users.created_at', '<', sql`to_timestamp(${Number(queryStart)})`)
    .where('users.updated_at', '<', sql`to_timestamp(${Number(queryStart)})`)
    .where((eb) => eb.or([
      eb('users.first_name', 'ilike',`%${nameQuery}%`),
      eb('users.last_name', 'ilike', `%${nameQuery}%`)
    ]))
    .groupBy('users.id')
};

function buildCoreUserQuery(
  eb: any,
  queryStart: string,
  skills?: string[],
  tracks?: string[],
  languages?: string[],
  country?: string,
  city?: string,
  lookingForCollab?: boolean,
  isUniversityStudent?: boolean,
) {
  let query = eb.selectFrom('users')

  if (skills) {
    query = query
      .innerJoin(
        'users_skills',
        (join) => join
          .onRef('users.id', '=', 'users_skills.user_id')
          .on('users_skills.skill_name', 'in', skills)
      );
  }

  if (tracks) {
    query = query
      .innerJoin(
        'users_interested_tracks',
        (join) => join
          .onRef('users.id', '=', 'users_interested_tracks.user_id')
          .on('users_interested_tracks.track_name', 'in', tracks)
      );
  }

  if (languages) {
    query = query
      .where('users.languages', '@>', JSON.stringify(languages));
  }

  if (country) {
    query = query.where('users.country', '=', country);
  }

  if (city) {
    query = query.where('users.city', '=', city);
  }

  if (lookingForCollab !== undefined) {
    query = query.where('users.looking_for_collab', '=', lookingForCollab);
  }

  if (isUniversityStudent !== undefined) {
    query = query.where('users.is_university_student', '=', isUniversityStudent);
  }

  return query
    .select([
      'users.id',
      'users.first_name',
      'users.last_name',
      'users.city',
      'users.is_university_student',
      'users.current_position',
      'users.languages',
      'users.updated_at',
    ])
    .where('users.created_at', '<', sql`to_timestamp(${Number(queryStart)})`)
    .where('users.updated_at', '<', sql`to_timestamp(${Number(queryStart)})`)
}