export class Migration20250220222648 {

    static up() :string {
        return `CREATE TABLE users (
            user_name varchar(255) NOT NULL,
            PRIMARY KEY (user_name)
        );`;
    };

    static down() :string {
        return `-- Write the SQL query here to undo the change`;
    };
}