require('dotenv/config');
const path = require('path');
const fileName = process.env.DB_MENSAJES || 'ecommerce.sqlite';
const DB = path.join(__dirname ,'../db/', fileName);

const sqliteConfig = {
    client:'sqlite3',
    connection:{
        filename: DB,
    },
    useNullAsDefault:true,
}

const mariaDbConfig = {
    client:'mysql',
    connection:{
        host: process.env.MARIADB_HOST || "127.0.0.1",
        database:process.env.MARIADB_DATABASE || "testdb",
        user:process.env.MARIADB_USER || "root",
        password:process.env.MARIADB_PASSWORD || "",        
    }
}

module.exports = {
    sqliteConfig,
    mariaDbConfig,
};