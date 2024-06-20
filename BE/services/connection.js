const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config()


var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) =>{
    if(err){
        console.log(err)
        console.log("Error connecting to Database....");
        return;
    }else{
        console.log("Connection established....");
    }
    
});

module.exports = connection;