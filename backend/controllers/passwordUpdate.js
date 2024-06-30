const connection = require('../models/db');
const bcrypt = require('bcrypt');

async function passwordUpdate(req, res) {
    const { userId } = req.params; // Extract userId from route params
    const { password } = req.body; // Extract password from request body
    
    if (!userId || !password) {
        return res.status(400).send('UserId and new password are required');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'UPDATE usertable SET password = ? WHERE userId = ?';

    connection.query(query, [hashedPassword, userId], (err, result) => {
        if (err) return res.status(500).send('Server error');
        res.status(200).send('Password changed successfully');
    });
}

module.exports = { passwordUpdate };
