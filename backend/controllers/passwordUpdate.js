const connection = require('../models/db');
const bcrypt = require('bcrypt');

async function passwordUpdate(req, res) {
    const { userId } = req.params; // Extract userId from route params
    const { password } = req.body; // Extract password from request body
    
    try {
        if (!userId || !password) {
            return res.status(400).send('UserId and new password are required');
        }

        // Check if user is authenticated via Google
        if (req.user.provider === 'google') {
            return res.status(403).json({ error: 'Password change not allowed for Google authenticated users.' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const query = 'UPDATE usertable SET password = ? WHERE userId = ?';

        connection.query(query, [hashedPassword, userId], (err, result) => {
            if (err) {
                console.error('Error updating password:', err);
                return res.status(500).send('Failed to update password');
            }
            res.status(200).send('Password changed successfully');
        });
    } catch (err) {
        console.error('Error changing password:', err);
        res.status(500).send('Server error');
    }
}

module.exports = { passwordUpdate };
