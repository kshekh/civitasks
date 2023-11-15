import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('hyperdrive_projects')
    .addColumn('is_reviewed', 'boolean', (col) => col.defaultTo(false).notNull())
    .execute();

  await db.schema
    .createIndex('is_reviewed_idx')
    .on('hyperdrive_projects')
    .columns(['is_reviewed'])
    .execute();
};

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('hyperdrive_projects')
    .dropColumn('is_reviewed')
    .execute();
};

/**
 * To be run in prod:
 * UPDATE hyperdrive_projects SET is_reviewed=true
 */
