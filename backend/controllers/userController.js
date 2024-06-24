const bcrypt = require("bcrypt");
const db = require("../models/db");
const generateAccessToken = require('../generateAccessToken');

// CREATE USER
const createUser = async (req, res) => {
    const { firstname, lastname, email, password, location, subLocation } = req.body;

    if (!firstname || !lastname || !email || !password || !location || !subLocation) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.getConnection(async (err, connection) => {
        if (err) throw err;
        const sqlSearch = "SELECT * FROM userTable WHERE email = ?";
        const search_query = connection.format(sqlSearch, [email]);
        const sqlInsert = "INSERT INTO userTable (firstname, lastname, email, password, location, subLocation) VALUES (?, ?, ?, ?, ?, ?)";
        const insert_query = connection.format(sqlInsert, [firstname, lastname, email, hashedPassword, location, subLocation]);

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
                    return res.status(201).json({ message: 'User created successfully', user: { firstname, lastname, email, location, subLocation } });
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
                const userId = result[0].id; 
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

const ThirdPartyAuth = async (req, res, next) => {
    // Successful authentication, generate JWT
    // Handle the Auth and create user object
    // res.json(user) //send user to client....
    const user = req.user;
    const token = generateAccessToken({ id: user.id, email: user.email });
     // Set the token as a cookie
     res.cookie('accessToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

     // Redirect to the homepage
     res.redirect('http://localhost:4200/homepage');
    };

module.exports = { createUser, loginUser, ThirdPartyAuth };
