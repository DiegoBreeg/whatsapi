import * as fs              from 'fs';
import * as path            from 'path';

export class MigrationMigrate {
    static execute() {
        console.log(process.argv);
    }
}

MigrationMigrate.execute();