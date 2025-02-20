import mysql, { Pool, PoolOptions, RowDataPacket, ResultSetHeader, Connection }     from 'mysql2/promise';
import { mySQLConnectionConfig }                                                    from './MySQLConnectionConfig';

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

    public async getConnection(): Promise<Connection> {
        return await this.pool.getConnection();
    }

    public async query<T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader>(
        sql         : string,
        params      ?: any[]
    ): Promise<T> {
        const connection = await this.pool.getConnection();
        const [rows] = await connection.query<T>(sql, params);
        connection.release();
        return rows;
    }

    public async close(): Promise<void> {
        await this.pool.end();
    }

    public async ensureDatabase(): Promise<void> {
        const connection: Connection = await mysql.createConnection({
            host        : mySQLConnectionConfig.host,
            user        : mySQLConnectionConfig.user,
            password    : mySQLConnectionConfig.password
        });

        const sql = `CREATE DATABASE IF NOT EXISTS \`${mySQLConnectionConfig.database}\``;
        await connection.query<RowDataPacket[]>(sql);

       console.log("\x1b[32m%s\x1b[0m", `Database ${mySQLConnectionConfig.database} ensured!`);

       await connection.end();
       return;
    }
}