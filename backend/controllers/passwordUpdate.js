const connection = require('../../models/db');
const bcrypt = require('bcrypt');

async function adminPasswordUpdate(req, res) {
    const { admin_id, new_password } = req.body;

    if (!admin_id || !new_password) {
        return res.status(400).send('User ID and new password are required');
    }

    const hashedPassword = bcrypt.hashSync(new_password, 10);
    const query = 'UPDATE user_table SET password = ?, password_status = "changed" WHERE admin_id = ?';

    connection.query(query, [hashedPassword, admin_id], (err, result) => {
        if (err) return res.status(500).send('Server error');
        res.status(200).send('Password changed successfully');
    });
}

module.exports = adminPasswordUpdate;