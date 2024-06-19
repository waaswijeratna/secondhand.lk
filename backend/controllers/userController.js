const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/db");
const generateAccessToken = require('../generateAccessToken'); 
require('dotenv').config();

// CREATE USER
const createUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.getConnection(async (err, connection) => {
        if (err) throw err;
        const sqlSearch = "SELECT * FROM userTable WHERE email = ?";
        const search_query = connection.format(sqlSearch, [email]);
        const sqlInsert = "INSERT INTO userTable (email, password) VALUES (?, ?)";
        const insert_query = connection.format(sqlInsert, [email, hashedPassword]);

        await connection.query(search_query, async (err, result) => {
            if (err) {
                connection.release();
                return res.status(500).json({ message: 'Database query error' });
            }
            if (result.length != 0) {
                connection.release();
                console.log("------> Email already exists");
                return res.status(409).json({ message: 'Email already exists' });
            } else {
                await connection.query(insert_query, (err, result) => {
                    if (err) {
                        connection.release();
                        return res.status(500).json({ message: 'Database insert error' });
                    }

                    connection.release();
                    console.log("--------> Created new User");
                    return res.status(201).json({ message: 'User created successfully' });
                });
            }
        });
    });
};

// LOGIN (AUTHENTICATE USER, and return accessToken)
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    db.getConnection(async (err, connection) => {
        if (err) throw err;
        const sqlSearch = "SELECT * FROM userTable WHERE email = ?";
        const search_query = connection.format(sqlSearch, [email]);

        await connection.query(search_query, async (err, result) => {
            connection.release();
            if (err) throw err;
            if (result.length == 0) {
                console.log("--------> User does not exist");
                return res.sendStatus(404);
            } else {
                const hashedPassword = result[0].password;
                const userId = result[0].id; // Extract the user ID from the result
                if (await bcrypt.compare(password, hashedPassword)) {
                    console.log("---------> Login Successful");
                    console.log("---------> Generating accessToken");
                    const token = generateAccessToken({ id: userId, email });
                    console.log(token);
                    return res.json({ accessToken: token });
                } else {
                    console.log("---------> Password Incorrect");
                    return res.status(401).json({ message: 'Password incorrect' });
                }
            }
        });
    });
};


// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});


// Generate a random token
const generateResetToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// REQUEST PASSWORD RESET
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    db.getConnection(async (err, connection) => {
        if (err) throw err;
        const sqlSearch = "SELECT * FROM userTable WHERE email = ?";
        const search_query = connection.format(sqlSearch, [email]);

        await connection.query(search_query, async (err, result) => {
            if (err) {
                connection.release();
                return res.status(500).json({ message: 'Database query error' });
            }

            if (result.length === 0) {
                connection.release();
                return res.status(404).json({ message: 'Email not found' });
            }

            const resetToken = generateResetToken();
            const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

            const sqlUpdate = "UPDATE userTable SET resetToken = ?, resetTokenExpiry = ? WHERE email = ?";
            const update_query = connection.format(sqlUpdate, [resetToken, resetTokenExpiry, email]);

            await connection.query(update_query, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).json({ message: 'Database update error' });
                }

                const resetUrl = `http://localhost:4200/resetPassword?token=${resetToken}`;

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Password Reset',
                    text: `You requested a password reset. Please click on the following link to reset your password: ${resetUrl}`
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error sending email' });
                    }

                    res.status(200).json({ message: 'Password reset email sent' });
                });
            });
        });
    });
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password are required' });
    }

    db.getConnection(async (err, connection) => {
        if (err) throw err;

        const sqlSearch = "SELECT * FROM userTable WHERE resetToken = ?";
        const search_query = connection.format(sqlSearch, [token]);

        await connection.query(search_query, async (err, result) => {
            if (err) {
                connection.release();
                return res.status(500).json({ message: 'Database query error' });
            }

            if (result.length === 0) {
                connection.release();
                return res.status(400).json({ message: 'Invalid or expired token' });
            }

            const user = result[0];
            if (user.resetTokenExpiry < Date.now()) {
                connection.release();
                return res.status(400).json({ message: 'Token expired' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const sqlUpdate = "UPDATE userTable SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE id = ?";
            const update_query = connection.format(sqlUpdate, [hashedPassword, user.id]);

            await connection.query(update_query, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).json({ message: 'Database update error' });
                }

                res.status(200).json({ message: 'Password reset successful' });
            });
        });
    });
};

module.exports = { createUser, loginUser, requestPasswordReset, resetPassword };