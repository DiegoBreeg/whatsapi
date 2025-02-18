import 'dotenv/config'

export const mySQLConnectionConfig = {
    host                : process.env.MYSQL_HOST,
    user                : process.env.MYSQL_USER,
    password            : process.env.MYSQL_PASSWORD,
    database            : process.env.MYSQL_DATABASE,
    waitForConnections  : true,
    connectionLimit     : 10,
    maxIdle             : 10,
    idleTimeout         : 60000,
    queueLimit          : 0,
};
