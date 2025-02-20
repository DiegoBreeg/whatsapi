import * as fs              from 'fs';
import * as path            from 'path';

export class MigrationGenerate {
    public static execute() {
        const actualDateString                  = MigrationGenerate.generateActualDateString();
        const migrationName                     = `Migration${actualDateString}`;
        const migrationDir                      = path.join(__dirname, "migrations");
        const migrationPath                     = path.join(migrationDir, `${migrationName}.ts`);
        const templatePath                      = path.join(__dirname, "Migration.template");

        if(!fs.existsSync(migrationDir)) {
            fs.mkdirSync(migrationDir,{ recursive: true });
        }

        const migrationTemplate                 = fs.readFileSync(templatePath, "utf8");
        const formattedTemplate                 = migrationTemplate.replace(/--migrationName/g, migrationName);

        fs.writeFileSync(migrationPath, formattedTemplate);

        console.log("Generated new migration class to:");
        console.log("\x1b[32m%s\x1b[0m",`${migrationPath}`)
    };

    private static generateActualDateString() {
        const now           = new Date();
        const nowInBrazil   = new Date(
              now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
        );

        const year          = nowInBrazil.getFullYear();
        const month         = String(nowInBrazil.getMonth() + 1).padStart(2, "0");
        const day           = String(nowInBrazil.getDate()).padStart(2, "0");
        const hours         = String(nowInBrazil.getHours()).padStart(2, "0");
        const minutes       = String(nowInBrazil.getMinutes()).padStart(2, "0");
        const seconds       = String(nowInBrazil.getSeconds()).padStart(2, "0");

        return year + month + day + hours + minutes + seconds;
    }
}

MigrationGenerate.execute();