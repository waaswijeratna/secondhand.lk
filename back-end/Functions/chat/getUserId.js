const pool = require('../../Services/db');

module.exports = async function getUserId(req, res) {
    try {
        const query = "SELECT user_id FROM secondhand.user;";
        const [rows] = await pool.query(query);

        if (rows.length === 0) return res.status(200).json([]);

        const response = rows.map(user => user.user_id);

        return res.status(200).json(response);
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ message: 'Unexpected error occurred. Please try again.' });
    }
};
