import { Pool } from 'mysql2/promise';
import { UserRepository } from "../../core/repositories/UserRepository.js";
import { User } from "../../core/entities/User.js";

export class MysqlUserRepository implements UserRepository
{
    constructor(private readonly mysqlConnectionPool: Pool) { }

    async findById(id: string): Promise<User | void>
    {
        
        console.log(id);
        const [ rows ] = await this.mysqlConnectionPool.query("SELECT * FROM teste;");
        console.log(rows);

        return Promise.resolve();
    }

    save(user: User): Promise<void>
    {
        console.log(user);
        return Promise.resolve();
    }

    update(user: User): Promise<User>
    {
        return Promise.resolve(user);
    }

    deleteById(id: string): Promise<void>
    {
        console.log(id)
        return Promise.resolve();
    }

    findAll({ cursor, limit }: { cursor: string; limit: number; }): Promise<User[]>
    {
        console.log(cursor + limit)
        return Promise.resolve([]);
    }

    findAllByTenantId(tenantId: string, cursor: string, limit: number): Promise<User[]>
    {
        console.log(tenantId + cursor + limit);


        return Promise.resolve([]);
    }

}