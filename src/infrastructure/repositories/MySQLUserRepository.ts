import { UserEntity } from "../../core/entities/UserEntity";
import { UserRepository } from "../../core/repositories/UserRepository";
import { MySQLConnection } from "../database/MySQLConnection";

export class MySQLUserRepository implements UserRepository {
    constructor(private readonly database: MySQLConnection) {}

    save(user: UserEntity): Promise<UserEntity> | Promise<null> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<UserEntity> | Promise<null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, user: Partial<UserEntity>): Promise<UserEntity> | Promise<null> {
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