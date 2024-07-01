// models/user.js
const db = require("../models/db");
// const { forgotPassword, resetPassword } = require('../controllers/passwordController');

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
      db.query('INSERT INTO userTable SET ?', user, (error, results) => {
        if (error) {
          reject(error);
        } else {
          const newUser = { id: results.insertId, ...user };
          resolve(newUser);
        }
      });
    });
  };

//   // Example correction in your user.js or where createUserInDb function is defined
// const createUserInDb = async (userData) => {
//     const { userId, email, firstName, lastName, provider } = userData;
//     const query = `INSERT INTO usertable (userId, email, firstName, lastName, provider) 
//                    VALUES (?, ?, ?, ?, ?)`;
//     try {
//       const result = await db.query(query, [userId, email, firstName, lastName, provider]);
//       return result;
//     } catch (error) {
//       console.error('Error creating user in database:', error);
//       throw error;
//     }
//   };
  

  const findOne = ({ resetToken, resetTokenExpiry }) => {
    console.log(`Finding user with token: ${resetToken} and expiry: ${resetTokenExpiry}`);
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * FROM userTable 
            WHERE resetToken = ? AND resetTokenExpiry > ?
        `;
        db.query(query, [resetToken, Date.now()], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0]);
        });
    });
};

const updateUserById = (userId, updates) => {
    const { password, resetToken, resetTokenExpiry } = updates;
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE userTable 
            SET password = ?, resetToken = ?, resetTokenExpiry = ?
            WHERE userId = ?
        `;
        db.query(query, [password, resetToken, resetTokenExpiry, userId], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results.affectedRows > 0);
        });
    });
};

const findUserById = (userId) => {
    console.log(`Finding user with ID: ${userId}`);
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM userTable WHERE userId = ?';
        db.query(query, [userId], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0]);
        });
    });
};

const updateUserProfileById = (userId, updateFields) => {
    const fields = Object.keys(updateFields).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updateFields);
    values.push(userId);

    return new Promise((resolve, reject) => {
        const query = `UPDATE userTable SET ${fields} WHERE userId = ?`;
        db.query(query, values, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results.affectedRows > 0);
        });
    });
};



module.exports = { findUserByEmail, createUserInDb, findOne, updateUserById, findUserById, updateUserProfileById};