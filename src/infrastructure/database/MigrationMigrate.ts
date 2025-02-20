import * as fs                      from 'fs';
import * as path                    from 'path';
import { MySQLConnection }          from './MySQLConnection';
import { RowDataPacket } from 'mysql2';

export class MigrationMigrate {
    static readonly #database                           = MySQLConnection.getInstance();
    static readonly #migrationsDir                      = path.join(__dirname, "migrations");
    static readonly #arguments                          = process.argv[2];
    static readonly #databaseName                       = process.env.MYSQL_DATABASE;

    static async execute() {
        try {
            await MigrationMigrate.#database.ensureDatabase();
            await MigrationMigrate.ensureMigrationTable();
            const migrations = await MigrationMigrate.loadMigrations();
            const alreadyMigrated = await MigrationMigrate.loadAlreadyMigrated();
            const migrationsToApply = MigrationMigrate.getMigrationsToApply(migrations, alreadyMigrated);

            for (const migration of migrationsToApply) {
                await MigrationMigrate.#database.query(migration.sql);
                await MigrationMigrate.registerMigration(migration.version);
                console.log("\n");
                console.log("\x1b[32m%s\x1b[0m", `Version: ${migration.version} successfully migrated!`);
                console.log("\x1b[32m%s\x1b[0m", `${migration.sql}`);
                console.log("\n");
            }
        } catch (error) {
            console.error("\x1b[31m%s\x1b[0m", "Error during migration:", error);
        } finally {
            await MigrationMigrate.#database.close();
        }
    }

    private static async ensureMigrationTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS migrations (
            version varchar(255) NOT NULL,
            created_at DATETIME NOT NULL,
            deleted_at DATETIME,
            PRIMARY KEY (version)
        );`;

        await MigrationMigrate.#database.query(sql);
        console.log("\x1b[32m%s\x1b[0m", `Table ${MigrationMigrate.#databaseName} ensured!`);
        return;
    }

    private static async loadMigrations() {
        const files = fs.readdirSync(MigrationMigrate.#migrationsDir).sort();
        const migrations = await Promise.all(
            files.map(file => import(path.join(MigrationMigrate.#migrationsDir, file)))
        );

        return migrations.map(migration => {
            const version = Object.keys(migration)[0];
            const sql = migration[version].up();
            return {version: version.replace("Migration", ""), sql};
        });
    }

    private static async loadAlreadyMigrated(): Promise<RowDataPacket[]> {
        return await MigrationMigrate.#database.query("SELECT * FROM migrations WHERE deleted_at IS NULL;");
    }

    private static getMigrationsToApply(migrations: any[], alreadyMigrated: any[]) {
        return migrations.filter(migration =>
            !alreadyMigrated.some(already => already.version === migration.version)
        );
    }

    private static async registerMigration(version: string) {
        const sql = `
            INSERT INTO migrations (version, created_at)
            VALUES (${version}, NOW())
        ;`;

        await MigrationMigrate.#database.query(sql);
    }
}

MigrationMigrate.execute()