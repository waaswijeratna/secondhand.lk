const mysql = require('mysql2/promise');

// MySQL database connection setup
const pool = mysql.createPool({
    host: 'secondhand.mysql.database.azure.com',
    user: 'akila',
    password: 'Dilshan@',
    database: 'secondhand',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL database');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Terminate the application if unable to connect to the database
    });

module.exports = pool;
