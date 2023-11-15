import pg from 'pg';
import { Kysely, ParseJSONResultsPlugin, PostgresDialect } from 'kysely';
import { DB } from './schemas/schema';
import { config } from '@config';
const { Pool } = pg;

// NOTE - do not call this function directly, unless you want a fresh Db connection for
// standalone use (e.g. for running migrations). From within a running application,
// always use the exported `db` constant instead.
export function initKyselyConnection() {
	try {
		return new Kysely<DB>({
			dialect: new PostgresDialect({
				pool: new Pool({
					connectionString: config.DATABASE_URL
					// Additional pool configuration options here
				})
			}),
			plugins: [new ParseJSONResultsPlugin()]
		});
	} catch (error) {
		console.error('Failed initiating kysely with connection to DB, exiting.', error);
		process.exit(1);
	}
}

export const db = initKyselyConnection();
