import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('hyperdrive_projects')
    .addColumn('is_junk', 'boolean', (col) => col.defaultTo(false).notNull())
    .execute();

  await db.schema
    .createIndex('is_junk_idx')
    .on('hyperdrive_projects')
    .columns(['is_junk'])
    .execute();
};

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('hyperdrive_projects')
    .dropColumn('is_junk')
    .execute();
};

/**
 * To be run in prod:
 * UPDATE hyperdrive_projects SET is_junk=true WHERE id IN(700, 623, 70, 65, 4, 91, 33, 610, 151, 180, 629, 90, 913, 885, 89, 113, 591, 619, 102, 93, 440, 27, 171, 620, 71, 107, 605, 108, 114, 92, 64, 104, 5, 94, 106, 665, 726, 68, 28, 103, 112, 11, 40, 22, 97, 31, 36, 728, 34, 37);
 */
