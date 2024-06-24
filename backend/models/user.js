// models/user.js
const db = require("../models/db");

const findUserByEmail = (email) => {
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
        db.query(query, [email, firstName, lastName, provider], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve({ id: results.insertId, ...user });
        });
    });
};

module.exports = { findUserByEmail, createUserInDb };