import {
	EditProfileParams,
	RetrieveProfileResponse,
	aboutYouFormSchema,
} from '../user-api-schemas';
import { db } from '@database/setup';
import { AuthorizeError } from '@middlewares/error-handler';
import { propToObjKeyOrEmpty } from '@utils';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';
import Session from 'supertokens-node/recipe/session';

// This has to live here rather than in schemas/user-api-schemas.ts,
// otherwise the Typescript compiler complains. Maybe something about
// the order of type definitions?
export const editProfileSchema: JSONSchemaType<EditProfileParams> = {
	type: 'object',
	properties: {
		...aboutYouFormSchema.properties,
    interestedTracks: { 
      type: 'array', 
      items: { 
        type: "object", 
        properties: { 
          name: { type: 'string' }
        },
        required: ['name'],
        additionalProperties: false,
      } 
    },
    yourRoles: { 
      type: 'array', 
      items: { 
        type: "object", 
        properties: { 
          name: { type: 'string' }
        },
        required: ['name'],
        additionalProperties: false,
      }, 
      nullable: true 
    },
    yourSkills: { 
      type: 'array', 
      items: { 
        type: "object", 
        properties: { 
          name: { type: 'string' }
        },
        required: ['name'],
        additionalProperties: false,
      }, 
      nullable: true 
    },
    rolesLookingFor: { 
      type: 'array', 
      items: { 
        type: "object", 
        properties: { 
          name: { type: 'string' }
        },
        required: ['name'],
        additionalProperties: false,
      }, 
      nullable: true 
    },
    lookingToBuild: { type: 'string' },
    lookingForCollab: { type: 'boolean', nullable: true },
  },
	required: [...aboutYouFormSchema.required, 'interestedTracks', 'lookingToBuild'],
	additionalProperties: false
};

export async function editProfile(
	req: Request<{}, {}, EditProfileParams, {}>,
	res: Response<RetrieveProfileResponse>,
	next: NextFunction
) {
	try {
		let session = await Session.getSession(req, res);
		if (session === undefined) {
			// This should never happen because we're using the verifySession() middleware
			console.error('No session found in onboarding method!');
			throw new AuthorizeError('Session not found.');
		}

		const userFieldUpdates = {};

		const user_column_mappings = {
			firstName: 'first_name',
			lastName: 'last_name',
			country: 'country',
			city: 'city',
			languages: 'languages',
			aboutYou: 'about',
			currentPosition: 'current_position',
			isUniversityStudent: 'is_university_student',
			githubHandle: 'github_handle',
			discordHandle: 'discord_handle',
			twitterHandle: 'twitter_handle',
			telegramHandle: 'telegram_handle',
			lookingForCollab: 'looking_for_collab',
			lookingToBuild: 'looking_to_build'
		};

		for (const [paramName, dbColumn] of Object.entries(user_column_mappings)) {
			// Build up a map of the user model fields that were actually sent in the request
			// i.e. the fields that we want updated in the DB
			if (req.body[paramName] !== undefined && req.body[paramName] !== null) {
				userFieldUpdates[dbColumn] = req.body[paramName];
			}
		}

		// This is annoying, but lanaguages is the one-off (jsonb array), so we fix it here
		if (req.body.languages !== undefined && req.body.languages !== null) {
			userFieldUpdates['languages'] = JSON.stringify(req.body.languages);
		}

		// Now we have to handle fields on joined tables.
		// These are constants that let us build up a more
		// generic query format for all the tables
		// without having to repeat lots of stuff.
		const schema_for_joined_insertions = {
			interestedTracks: {
				table: 'users_interested_tracks',
				join_table: 'tracks'
			},
			yourRoles: {
				table: 'users_roles',
				join_table: 'roles'
			},
			yourSkills: {
				table: 'users_skills',
				join_table: 'skills'
			},
			rolesLookingFor: {
				table: 'users_looking_for_roles',
				join_table: 'roles'
			}
		};

		const returnLists = {
			interestedTracks: [],
			yourRoles: [],
			yourSkills: [],
			rolesLookingFor: []
		};

		let updatedUser;

		await db.transaction().execute(async (trx) => {
			updatedUser = await trx
				.updateTable('users')
				.set(userFieldUpdates)
				.set({updated_at: new Date().toISOString()})
				.where('auth_id', '=', session.getUserId())
				.returningAll()
				.executeTakeFirstOrThrow();

			// This will transform the input lists for roles, skills, etc.
			// into the right format for DB insertion.
			// ex. [{ name: 'foo' }, { name: 'bar' }] => [{ user_id: 1, role_name: 'foo' }, { user_id: 1, role_name: 'bar' }]
			const mapForJoinedInsertions = (inputData, name_col) =>
				inputData.map((item) => ({
					user_id: updatedUser.id,
					[name_col]: item.name
				}));

			for (const key of Object.keys(schema_for_joined_insertions)) {
				const tableName = schema_for_joined_insertions[key].table;
				const inputData = req.body[key];

				// Delete existing entries. This is simpler than trying to diff which ones to delete and which to insert,
				// which would mean the same number of queries. Assuming we're dealing with N(10) entries per
				// joined table, worst case it's not a big deal to delete and re-insert them all.
				await trx.deleteFrom(tableName).where('user_id', '=', updatedUser.id).execute();

				// This is kinda gross, but probably fine? We could just define all these
				// keys up front in the map, which I'll do if this turns out to cause
				// any performance issues.
				const prefix = schema_for_joined_insertions[key].join_table.slice(0, -1);
				const name_col = `${prefix}_name`;
				const id_col = `${prefix}_id`;

				if (inputData && inputData.length > 0) {
					const records = mapForJoinedInsertions(inputData, name_col);

					const updated = await trx
						.insertInto(tableName)
						.values(({ selectFrom }) =>
							records.map((entry) => ({
								user_id: entry.user_id,
								[name_col]: entry[name_col],
								// Use a subquery to match name to id, because the relationship
								// tables need both.
								[id_col]: selectFrom(schema_for_joined_insertions[key].join_table)
									.select('id')
									.where('name', '=', entry[name_col])
							}))
						)
						.returning(name_col)
						.execute();

					// We retrieve all names for the updated records, per join table.
					// Since we're deleting and re-inserting even existing records,
					// right now those will come back too, even though technically they're not new
					returnLists[key] = updated.map((item) => item[name_col]);
				}
			}
		});

		const response = {
			userId: updatedUser.id,
			urlSlug: updatedUser.url_slug,
			firstName: updatedUser.first_name,
			lastName: updatedUser.last_name,
			email: updatedUser.email,
			country: updatedUser.country,
			city: updatedUser.city,
			languages: updatedUser.languages,
			aboutYou: updatedUser.about,
			currentPosition: updatedUser.current_position,
			isUniversityStudent: updatedUser.is_university_student,
			lookingForCollab: updatedUser.looking_for_collab,
			lookingToBuild: updatedUser.looking_to_build,
			...propToObjKeyOrEmpty(updatedUser.github_handle, 'githubHandle'),
			...propToObjKeyOrEmpty(updatedUser.discord_handle, 'discordHandle'),
			...propToObjKeyOrEmpty(updatedUser.twitter_handle, 'twitterHandle'),
			...propToObjKeyOrEmpty(updatedUser.telegram_handle, 'telegramHandle'),
			interestedTracks: returnLists.interestedTracks,
			yourRoles: returnLists.yourRoles,
			yourSkills: returnLists.yourSkills,
			rolesLookingFor: returnLists.rolesLookingFor,
		};

		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
}
