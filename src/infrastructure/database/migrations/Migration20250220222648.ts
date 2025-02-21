export class Migration20250220222648 {

    static up() :string {
        return `
        CREATE TABLE users (
            id BINARY(16) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            hashed_password VARCHAR(128) NOT NULL UNIQUE,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
            deleted_at DATETIME NULL DEFAULT NULL,
            updated_by BINARY(16) NULL DEFAULT NULL,
            PRIMARY KEY (id),
            INDEX idx_users_email (email)
        );`;
    };

    static down() :string {
        return `DROP TABLE IF EXISTS users;`;
    };
}