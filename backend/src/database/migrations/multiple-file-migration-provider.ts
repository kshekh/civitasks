import { Migration, MigrationProvider } from "kysely"

/**
 * This is mostly cribbed from Kysely's FileMigrationProvider, but modified
 * to take in a list of file paths instead of just one.
 * It collates the migrations from all the input paths into one
 * object for Kysely to consume.
 */
export class MultipleFileMigrationProvider implements MigrationProvider {
  readonly #props: MultipleFileMigrationProviderProps

  constructor(props: MultipleFileMigrationProviderProps) {
    this.#props = props
  }

  async getMigrations(): Promise<Record<string, Migration>> {
    const migrations: Record<string, Migration> = {}
    for (const migrationFolder of this.#props.migrationFolders) {
      const files = await this.#props.fs.readdir(migrationFolder)

      for (const fileName of files) {
        if (
          fileName.endsWith('.js') ||
          (fileName.endsWith('.ts') && !fileName.endsWith('.d.ts')) ||
          fileName.endsWith('.mjs') ||
          (fileName.endsWith('.mts') && !fileName.endsWith('.d.mts'))
        ) {
          const migration = await import(
            /* webpackIgnore: true */ this.#props.path.join(
              migrationFolder,
              fileName
            )
          )
          const migrationKey = fileName.substring(0, fileName.lastIndexOf('.'))

          // Handle esModuleInterop export's `default` prop...
          if (isMigration(migration?.default)) {
            migrations[migrationKey] = migration.default
          } else if (isMigration(migration)) {
            migrations[migrationKey] = migration
          }
        }
      }
    }

    return migrations
  }
}

function isMigration(obj: unknown): obj is Migration {
  return typeof obj === 'object' && obj !== null && 'up' in obj && typeof obj.up === 'function'
}

interface FileMigrationProviderFS {
  readdir(path: string): Promise<string[]>
}

interface FileMigrationProviderPath {
  join(...path: string[]): string
}

interface MultipleFileMigrationProviderProps {
  fs: FileMigrationProviderFS
  path: FileMigrationProviderPath
  migrationFolders: string[]
}
