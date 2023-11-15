import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('auth_id', 'text', (col) => col.notNull().unique())
    .addColumn('url_slug', 'text', (col) => col.unique())
    .addColumn('first_name', 'text')
    .addColumn('last_name', 'text')
    .addColumn('email', 'text', (col) => col.unique())
    .addColumn('country', 'text')
    .addColumn('city', 'text')
    .addColumn('languages', 'jsonb')
    .addColumn('telegram_handle', 'text')
    .addColumn('discord_handle', 'text')
    .addColumn('twitter_handle', 'text')
    .addColumn('github_handle', 'text')
    .addColumn('about', 'text')
    .addColumn('current_position', 'text')
    .addColumn('is_university_student', 'boolean')
    .addColumn('looking_for_collab', 'boolean', (col) => col.notNull().defaultTo(false))
    .addColumn('looking_to_build', 'text')
    .addColumn('onboarding_complete', 'boolean', (col) => col.notNull().defaultTo(false))
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .execute()
  
    await db.schema
      .createIndex('users_created_at_idx')
      .on('users')
      .columns(['created_at'])
      .execute()
  
    await db.schema
      .createIndex('users_updated_at_idx')
      .on('users')
      .columns(['updated_at'])
      .execute()

  await db.schema
    .createTable('skills')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull().unique())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .execute()
  
  await db.schema
    .createTable('users_skills')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_id', 'integer', (col) => col.references('users.id').onDelete('cascade').notNull())
    .addColumn('skill_id', 'integer', (col) => col.references('skills.id').onDelete('cascade').notNull())
    .addColumn('skill_name', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .addUniqueConstraint('users_skills_uniq', ['user_id', 'skill_id'])
    .addUniqueConstraint('users_skills_name_uniq', ['user_id', 'skill_name'])
    .execute()
  
  await db.schema
    .createTable('roles')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull().unique())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .execute()
  
  await db.schema
    .createTable('users_roles')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_id', 'integer', (col) => col.references('users.id').onDelete('cascade').notNull())
    .addColumn('role_id', 'integer', (col) => col.references('roles.id').onDelete('cascade').notNull())
    .addColumn('role_name', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .addUniqueConstraint('users_roles_uniq', ['user_id', 'role_id'])
    .addUniqueConstraint('users_roles_name_uniq', ['user_id', 'role_name'])
    .execute()

  await db.schema
    .createTable('users_looking_for_roles')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_id', 'integer', (col) => col.references('users.id').onDelete('cascade').notNull())
    .addColumn('role_id', 'integer', (col) => col.references('roles.id').onDelete('cascade').notNull())
    .addColumn('role_name', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .addUniqueConstraint('users_looking_for_roles_uniq', ['user_id', 'role_id'])
    .addUniqueConstraint('users_looking_for_roles_name_uniq', ['user_id', 'role_name'])
    .execute()
  
  await db.schema
    .createTable('hackathons')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull().unique())
    .addColumn('description', 'text', (col) => col.notNull())
    .addColumn('start_date', 'timestamptz', (col) => col.notNull())
    .addColumn('end_date', 'timestamptz', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull()
    )
    .execute()
  
  await db.schema
    .createTable('tracks')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull().unique())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .execute()
  
  await db.schema
    .createTable('hackathons_tracks')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('hackathon_id', 'integer', (col) => col.references('hackathons.id').onDelete('cascade').notNull())
    .addColumn('track_id', 'integer', (col) => col.references('tracks.id').onDelete('cascade').notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .addUniqueConstraint('hackathons_tracks_uniq', ['hackathon_id', 'track_id'])
    .execute()
  
  await db.schema
    .createTable('users_interested_tracks')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_id', 'integer', (col) => col.references('users.id').onDelete('cascade').notNull())
    .addColumn('track_id', 'integer', (col) => col.references('tracks.id').onDelete('cascade').notNull())
    .addColumn('track_name', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) => 
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .addUniqueConstraint('users_interested_tracks_uniq', ['user_id', 'track_id'])
    .addUniqueConstraint('users_interested_tracks_name_uniq', ['user_id', 'track_name'])
    .execute()
  
  await db.schema
    .createTable('hackathon_registrations')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('hackathon_id', 'integer', (col) => col.references('hackathons.id').onDelete('cascade').notNull())
    .addColumn('user_id', 'integer', (col) => col.references('users.id').onDelete('cascade').notNull())
    .addColumn('first_name', 'text')
    .addColumn('last_name', 'text')
    .addColumn('email', 'text', (col) => col.unique())
    .addColumn('country', 'text')
    .addColumn('city', 'text')
    .addColumn('languages', 'jsonb')
    .addColumn('about', 'text')
    .addColumn('current_position', 'text')
    .addColumn('telegram_handle', 'text')
    .addColumn('discord_handle', 'text')
    .addColumn('twitter_handle', 'text')
    .addColumn('github_handle', 'text')
    .addColumn('interested_tracks', 'jsonb')
    .addColumn('your_roles', 'jsonb')
    .addColumn('your_skills', 'jsonb')
    .addColumn('roles_looking_for', 'jsonb')
    .addColumn('looking_to_build', 'text')
    .addColumn('has_team', 'boolean')
    .addColumn('looking_for_collab', 'boolean')
    .addColumn('is_university_student', 'boolean')
    .addColumn('referral_code', 'text')
    .addColumn('agreed_to_terms', 'boolean')
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .addUniqueConstraint('users_hackathons_uniq', ['user_id', 'hackathon_id'])
    .execute()
  
  await db.schema
    .createTable('sources')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull().unique())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .execute()
  
  await db.schema
    .createTable('registrations_sources')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('registration_id', 'integer', (col) => col.references('hackathon_registrations.id').onDelete('cascade').notNull())
    .addColumn('source_id', 'integer', (col) => col.references('sources.id').onDelete('cascade').notNull())
    .addColumn('is_initial_source', 'boolean', (col) => col.defaultTo(false).notNull())
    .addColumn('other', 'text')
    .addUniqueConstraint('registrations_sources_uniq', ['registration_id', 'source_id'])
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .execute()
};

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('users').cascade().execute()
  await db.schema.dropTable('skills').cascade().execute()
  await db.schema.dropTable('users_skills').cascade().execute()
  await db.schema.dropTable('roles').cascade().execute()
  await db.schema.dropTable('users_roles').cascade().execute()
  await db.schema.dropTable('hackathons').cascade().execute()
  await db.schema.dropTable('tracks').cascade().execute()
  await db.schema.dropTable('hackathons_tracks').cascade().execute()
  await db.schema.dropTable('hackathon_registrations').cascade().execute()
  await db.schema.dropTable('sources').cascade().execute()
  await db.schema.dropTable('registrations_sources').cascade().execute()
};



