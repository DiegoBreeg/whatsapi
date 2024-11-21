import { createPool, Pool } from 'mysql2/promise';

export const mysqlConnectionPool: Pool = createPool({
    host: "Localhost",
    user: "root",
    password: "35264100",
    database: "whatsapi",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});