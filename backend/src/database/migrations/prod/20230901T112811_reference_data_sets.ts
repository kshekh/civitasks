import { HYPERDRIVE, ROLES, SKILLS, SOURCES, TRACKS } from '@config/base-app-data';
import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {

  await db
    .insertInto('hackathons')
    .values(HYPERDRIVE)
    .onConflict((oc) => oc.constraint('hackathons_name_key').doNothing())
    .execute();
  
  // Doing this fetch separately in case the insert
  // was a no-op and we don't get a record back.
  const hyperdriveId = 
    await db
      .selectFrom('hackathons')
      .select('id')
      .where('name', '=', HYPERDRIVE.name)
      .executeTakeFirst();

  const rolesData = ROLES.map(role => ({
    name: role,
  }));

  await db
    .insertInto('roles')
    .values(rolesData)
    .onConflict((oc) => oc.constraint('roles_name_key').doNothing())
    .execute();

  const skillsData = SKILLS.map(skill => ({
    name: skill,
  }));

  await db
    .insertInto('skills')
    .values(skillsData)
    .onConflict((oc) => oc.constraint('skills_name_key').doNothing())
    .execute();

  const tracksData = TRACKS.map(track => ({
    name: track,
  }));

  await db
    .insertInto('tracks')
    .values(tracksData)
    .onConflict((oc) => oc.constraint('tracks_name_key').doNothing())
    .execute();

  // Doing this fetch separately in case the insert
  // was a no-op and we don't get a record back.
  const trackIds = 
    await db
      .selectFrom('tracks')
      .select('id')
      .where('name', 'in', TRACKS)
      .execute();

  await db
    .insertInto('hackathons_tracks')
    .values(trackIds.map((track) => ({
      hackathon_id: hyperdriveId!.id,
      track_id: track.id,
    })))
    .onConflict((oc) => oc.constraint('hackathons_tracks_uniq').doNothing())
    .execute();
  
  const sourceData = SOURCES.map(source => ({
    name: source,
  }));
  
  await db
    .insertInto('sources')
    .values(sourceData)
    .onConflict((oc) => oc.constraint('sources_name_key').doNothing())
    .execute();
};

export async function down(db: Kysely<any>): Promise<void> {
  await db
    .deleteFrom('hackathons')
    .where('name', '=', HYPERDRIVE.name)
    .execute();

  await db
    .deleteFrom('roles')
    .where('name', 'in', ROLES)
    .execute();
  
  await db
    .deleteFrom('skills')
    .where('name', 'in', SKILLS)
    .execute();

  await db
    .deleteFrom('tracks')
    .where('name', 'in', TRACKS)
    .execute();

  await db
    .deleteFrom('sources')
    .where('name', 'in', SOURCES)
    .execute();
};