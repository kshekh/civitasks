import * as path from 'path'
import { promises as fs } from 'fs'
import { initKyselyConnection } from '../setup'
import { MigrationResult, Migrator, NO_MIGRATIONS } from 'kysely'
import { MultipleFileMigrationProvider } from './multiple-file-migration-provider'
import { config } from '@config'

async function migrate(down: boolean = false, migrateTo?: string) {
  const db = initKyselyConnection();

  const migrationFolders = [path.join(__dirname, 'prod')];
  if (config.RAILWAY_ENVIRONMENT_NAME !== 'production') {
    migrationFolders.push(path.join(__dirname, 'staging'));
  }

  const migrator = new Migrator({
    db,
    provider: new MultipleFileMigrationProvider({
      fs,
      path,
      migrationFolders,
    }),
  });

  try {
    if (down || migrateTo) {
      if (config.RAILWAY_ENVIRONMENT_NAME !== 'development') {
        console.error('Cannot migrate DOWN in any environment other than dev, exiting.');
        console.log('If this is a dev environment, please set RAILWAY_ENVIRONMENT_NAME=development in your .env file and try again.');
        await db.destroy();
        process.exit(1);
      }

      if (down) {
        const { error, results } = await migrator.migrateTo(NO_MIGRATIONS);
        handleResults(error, results);
      } else if (migrateTo) {
        const { error, results } = await migrator.migrateTo(migrateTo);
        handleResults(error, results);
      }
    } else {
      const { error, results } = await migrator.migrateToLatest();
      handleResults(error, results);
    }
  } catch (err) {
    console.error('Failed to complete db migrations due to error', err);
  }

  await db.destroy();
}
  
async function handleResults(error?: unknown, results?: MigrationResult[]) {
  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed ${it.direction.toUpperCase()} successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('Failed to complete db migrations due to error', error);
  }
}

const down = process.argv.includes('--down');
const to = process.argv.includes('--to');

if (to) {
  const index = process.argv.indexOf('--to');
  if (index + 1 >= process.argv.length) {
    console.error('Please provide a migration name to migrate to!');
    process.exit(1);
  }
  const toMigrationName = process.argv[index + 1];
  migrate(down, toMigrationName);
} else {
  migrate(down);
}
