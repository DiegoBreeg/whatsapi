import * as fs              from 'fs';
import * as path            from 'path';
import { MySQLConnection } from './MySQLConnection';

export class MigrationMigrate {
    private static readonly database                          = MySQLConnection.getInstance();
    private static readonly migrationDir                      = path.join(__dirname, "migrations");

    static execute() {
        const argument = process.argv[2];
        const migrations = fs.readdirSync(MigrationMigrate.migrationDir);
        console.log(migrations);
    }

    private loadMigrations() {

    }
}

MigrationMigrate.execute();