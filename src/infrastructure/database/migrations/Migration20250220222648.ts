export class Migration20250220222648 {

    static up() :string {
        return `
        CREATE TABLE users (
            id BINARY(16) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            hashed_password VARCHAR(128) NOT NULL,

            created_by BINARY(16) NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

            updated_by BINARY(16) NULL DEFAULT NULL,
            updated_at DATETIME NULL DEFAULT NULL,

            deleted_by BINARY(16) NULL DEFAULT NULL,
            deleted_at DATETIME NULL DEFAULT NULL,
            is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

            PRIMARY KEY (id),
            INDEX idx_users_email (email),
            INDEX idx_users_is_deleted (is_deleted)
        );`;
    };

    static down() :string {
        return `DROP TABLE IF EXISTS users;`;
    };
}