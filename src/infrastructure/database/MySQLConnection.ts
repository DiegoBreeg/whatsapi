import mysql, { Pool, PoolOptions, RowDataPacket, ResultSetHeader }     from 'mysql2/promise';
import { mySQLConnectionConfig }                                        from './MySQLConnectionConfig';

export class MySQLConnection {
    private static instance     : MySQLConnection;
    private pool                : Pool;

    private constructor(config: PoolOptions) {
        this.pool = mysql.createPool(config);
    }

    public static getInstance(): MySQLConnection {
        if (!MySQLConnection.instance) {
            MySQLConnection.instance = new MySQLConnection(mySQLConnectionConfig);
        }

        return MySQLConnection.instance;
    }

    public getPool(): Pool {
        return this.pool;
    }

    public async query<T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader>(
        sql         : string,
        params      ?: any[]
    ): Promise<[T, any]> {
        return await this.pool.query<T>(sql, params);
    }

    public async close(): Promise<void> {
        await this.pool.end();
    }
}