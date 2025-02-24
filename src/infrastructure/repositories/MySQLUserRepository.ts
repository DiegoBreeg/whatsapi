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
    is_active           : boolean;
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
                is_deleted,
                is_active
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
            user.isDeleted,
            user.isActive
        ];

        const resultSetHeader = await this.database.query<ResultSetHeader>(query, values);
        if(resultSetHeader.affectedRows < 1) {
            return null;
        }
        return user;
    }

    async find(
            {id, isDeleted, isActive, ignoreStatus}
            :{id: string, isDeleted?: boolean, isActive?: boolean, ignoreStatus?: boolean}
        ): Promise<UserEntity | null> {
        const conditions    = [];
        const values        = [];

        conditions.push("id = UUID_TO_BIN(?)");
        values.push(id);

        if(!ignoreStatus) {
            conditions.push("is_deleted = ?");
            isDeleted !== undefined
                ?values.push(isDeleted)
                : values.push(false)

            conditions.push("is_active = ?");
            isActive !== undefined
                ?values.push(isActive)
                :values.push(true)
        }

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
                is_deleted,
                is_active
            FROM users
            ${conditions.length > 0 ? "WHERE " + conditions.join(" AND "): ""}
            LIMIT 1;
        `;

        const [userRow] = await this.database.query<UserRow[]>(query, values);

        if(!userRow) {
            return null;
        }

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
            isDeleted           : userRow.is_deleted,
            isActive            : userRow.is_active
        });
    }

    async update(user: UserEntity): Promise<UserEntity |null> {
        const query = `
        UPDATE users
        SET
            hashed_password     = ?,
            updated_by          = UUID_TO_BIN(?),
            updated_at          = ?,
            deleted_by          = UUID_TO_BIN(?),
            deleted_at          = ?,
            is_deleted          = ?,
            is_active           = ?
            WHERE id            = UUID_TO_BIN(?)
        ;`;

        const values = [
            user.hashedPassword,
            user.updatedBy,
            user.updatedAt,
            user.deletedBy,
            user.deletedAt,
            user.isDeleted,
            user.isActive,
            user.id
        ];

        const resultSetHeader = await this.database.query<ResultSetHeader>(query, values);
        if(resultSetHeader.affectedRows < 1) {
            return null;
        }

        return user;
    }

    delete(id: string): Promise<boolean> {
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
    const user = await userRepository.find({
        id: "0195382d-613e-72ae-a62a-bb9fe801533e"
    });

    /* const result = await userRepository.save(new UserEntity({
        id: uuid,
        email: "teste2@teste.com",
        hashedPassword: "dskSsdaDFfsd",
        createdAt: new Date(),
        createdBy: uuid
    })); */
    if(!user) {
        return;
    }

    console.log(user.updatedAt);
    user.updatedAt = new Date();
    const response = await userRepository.update(user);

    console.log(response?.updatedAt);
})();