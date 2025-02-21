import { UserEntity } from "../../core/entities/UserEntity";
import { UserRepository } from "../../core/repositories/UserRepository";

export class MySQLUserRepository implements UserRepository {
    save(user: UserEntity): void {
        throw new Error("Method not implemented.");
    }
    find(userId: string): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    update(userId: string, user: Partial<UserEntity>): void {
        throw new Error("Method not implemented.");
    }
    remove(userId: string): void {
        throw new Error("Method not implemented.");
    }
    getAll(): UserEntity[] {
        throw new Error("Method not implemented.");
    }
    exists(userId: string): boolean {
        throw new Error("Method not implemented.");
    }

}