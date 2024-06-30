// models/user.js
const db = require("../models/db");

const findUserByEmail = (email) => {
    console.log(`Finding user with email: ${email}`);
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM userTable WHERE email = ?', [email], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0]);
        });
    });
};

const createUserInDb = (user) => {
    return new Promise((resolve, reject) => {
      const { email, firstName, lastName, provider } = user;
      const query = 'INSERT INTO userTable (email, firstname, lastname, provider) VALUES (?, ?, ?, ?)';
      console.log("Inserting user into DB with values:", email, firstName, lastName, provider); // Debug statement
      db.query(query, [email, firstName, lastName, provider], (error, results) => {
        if (error) {
          return reject(error);
        }
        const newUser = { id: results.insertId, ...user };
        resolve(newUser);
      });
    });
  };

async function findOne(userId) {
    console.log(`Finding user with userId: ${userId}`);

    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM userTable WHERE userId = ?';
        db.query(sql, [userId], (err, results) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                reject(err);
                return;
            }
            if (results.length > 0) {
                resolve(results[0]); // Resolve with the first user found (assuming userId is unique)
            } else {
                resolve(null); // Resolve with null if no user found
            }
        });
    });
}

async function updateUserById(userId, updateFields) {
    return new Promise((resolve, reject) => {
        const { firstName, lastName, password, location, subLocation } = updateFields;
        const sql = 'UPDATE userTable SET firstName = ?, lastName = ? ,  password = ?  , location = ?, subLocation = ? WHERE userId = ?';

        db.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, [firstName, lastName, password, location, subLocation, userId], (err, result) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result.affectedRows); // Return number of affected rows
            });
        });
    });
}

module.exports = { findUserByEmail, createUserInDb, findOne, updateUserById};