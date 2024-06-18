const mysql = require('mysql');

// MySQL database connection setup
const connection = mysql.createConnection({
    host: 'secondhand.mysql.database.azure.com',
    user: 'akila',
    password: 'Dilshan@',
    database: 'secondhand'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Terminate the application if unable to connect to the database
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;
