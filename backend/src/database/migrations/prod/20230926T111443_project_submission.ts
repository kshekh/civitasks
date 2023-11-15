import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('hyperdrive_projects')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('hackathon_id', 'integer', (col) => col.references('hackathons.id').onDelete('cascade').notNull())
    .addColumn('user_id', 'integer', (col) => col.references('users.id').onDelete('cascade').notNull().unique())
    .addColumn('name', 'text', (col) => col.notNull())    
    .addColumn('description', 'text', (col) => col.notNull())
    .addColumn('tracks', 'jsonb', (col) => col.notNull())
    .addColumn('repo_link', 'text', (col) => col.notNull())
    .addColumn('country', 'text', (col) => col.notNull())
    .addColumn('team_details', 'text', (col) => col.notNull())
    .addColumn('presentation_link', 'text', (col) => col.notNull())
    .addColumn('twitter_handle', 'text')
    .addColumn('looking_to_raise', 'boolean', (col) => col.notNull())
    .addColumn('solana_developer_experience', 'numeric', (col) => col.notNull())
    .addColumn('how_did_you_hear', 'jsonb', (col) => col.notNull())
    .addColumn('other_sources', 'jsonb')
    .addColumn('attended_workshop', 'boolean', (col) => col.notNull())
    .addColumn('additional_info', 'text')
    .addColumn('referral_code', 'text')
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .execute(); 

  await db.schema
    .createIndex('hyperdrive_projects_user_id_idx')
    .on('hyperdrive_projects')
    .columns(['user_id'])
    .execute()

  await db.schema
    .createTable('project_images')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('project_id', 'integer', (col) => col.references('hyperdrive_projects.id').onDelete('cascade'))
    .addColumn('url', 'text', (col) => col.notNull())
    .addColumn('state', 'text', (col) => col.notNull())
    .addColumn('size', 'integer', (col) => col.notNull())
    .addColumn('original_name', 'text', (col) => col.notNull())
    .addColumn('mimetype', 'text', (col) => col.notNull())
    .addColumn('hash', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.defaultTo(sql`TIMEZONE('utc', NOW())`).notNull())
    .execute();

  await db.schema
    .createIndex('project_images_project_id_idx')
    .on('project_images')
    .columns(['project_id'])
    .execute()
};


export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('hyperdrive_projects').cascade().execute();
  await db.schema.dropTable('project_images').cascade().execute();
};
