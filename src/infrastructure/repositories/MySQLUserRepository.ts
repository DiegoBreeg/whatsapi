import { UserEntity }                           from "../../core/entities/UserEntity";
import { UserRepository }                       from "../../core/repositories/UserRepository";
import { MySQLConnection }                      from "../database/MySQLConnection";
import { ResultSetHeader, RowDataPacket }       from 'mysql2/promise';
import { UUIDGeneratorServiceImp }              from "../services/UUIDGeneratorServiceImp";

export interface UserRow extends RowDataPacket {
    id                  : string;
    email               : string;
    hashed_password     : string;
    created_by          : string;
    created_at          : Date;
    updated_by          : string  | null;
    updated_at          : Date    | null;
    deleted_by          : string  | null;
    deleted_at          : Date    | null;
    is_deleted          : boolean;
}

export class MySQLUserRepository implements UserRepository {
    constructor(private readonly database: MySQLConnection) {}

    async save(user: UserEntity): Promise<UserEntity | null> {
        const query = `
            INSERT INTO users (
                id,
                email,
                hashed_password,
                created_by,
                created_at,
                updated_by,
                updated_at,
                deleted_by,
                deleted_at,
                is_deleted
            )
            VALUES (
                UUID_TO_BIN(?),
                ?,
                ?,
                UUID_TO_BIN(?),
                ?,
                UUID_TO_BIN(?),
                ?,
                UUID_TO_BIN(?),
                ?,
                ?
            );`;
        const values = [
            user.id,
            user.email,
            user.hashedPassword,
            user.createdBy,
            user.createdAt,
            user.updatedBy,
            user.updatedAt,
            user.deletedBy,
            user.deletedAt,
            user.isDeleted
        ];

        const resultSetHeader = await this.database.query<ResultSetHeader>(query, values);
        if(resultSetHeader.affectedRows < 1) {
            return null;
        }
        return user;
    }

    async find(id: string): Promise<UserEntity | null> {
        const query = `
            SELECT
                BIN_TO_UUID(id) as id,
                email,
                hashed_password,
                BIN_TO_UUID(created_by) as created_by,
                created_at,
                BIN_TO_UUID(updated_by) as updated_by,
                updated_at,
                BIN_TO_UUID(deleted_by) as deleted_by,
                deleted_at,
                is_deleted
            FROM users
            WHERE users.is_deleted = FALSE
            AND users.id = UUID_TO_BIN(?);
        `;
        const values            = [id];
        const row = await this.database.query<UserRow[]>(query, values);

        if(row.length === 0 ) {
            return null;
        }

        const userRow = row[0];
        return new UserEntity({
            id                  : userRow.id,
            email               : userRow.email,
            hashedPassword      : userRow.hashed_password,
            createdBy           : userRow.created_by,
            createdAt           : userRow.created_at,
            updatedBy           : userRow.updated_by,
            updatedAt           : userRow.updated_at,
            deletedBy           : userRow.deleted_by,
            deletedAt           : userRow.deleted_at,
            isDeleted           : userRow.is_deleted
        });
    }

    update(id: string, user: Partial<UserEntity>): Promise<UserEntity |null> {
        const query = `
            UPDATER users
            SET updated_by = ?,
                updated_at = ?,
                deleted_by = ?,
                deleted_at = ?,
                is_deleted = ?,
        `;
        const params = [
            user.updatedBy,
            user.updatedAt,
            user.deletedBy,
            user.deletedAt,
            user.isDeleted
        ];

        this.database.query(query, params);
        throw new Error("Method not implemented.");
    }
    remove(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<UserEntity[]> {
        throw new Error("Method not implemented.");
    }
    exists(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

(async ()=> {
    const uuidgenerator = new UUIDGeneratorServiceImp()
    const userRepository = new MySQLUserRepository(MySQLConnection.getInstance());
    const uuid = uuidgenerator.generate();
    /* const result = await userRepository.find("0195358f-3663-769a-aed1-c69eac6b208e");
    if(!result) {
        return;
    } */

    const result = await userRepository.save(new UserEntity({
        id: uuid,
        email: "asdaasadsfdfsdffdf",
        hashedPassword: "dskSDFfsd",
        createdAt: new Date(),
        createdBy: uuid
    }));

    console.log(`uuid gerado: ${uuid}`);
    console.log(result?.updatedBy);
})();