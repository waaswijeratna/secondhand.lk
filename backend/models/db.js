const mysql = require("mysql");

const db = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

db.getConnection((err, connection) => {
    if (err) throw err;
    console.log("DB connected successful: " + connection.threadId);
});

module.exports = db;
