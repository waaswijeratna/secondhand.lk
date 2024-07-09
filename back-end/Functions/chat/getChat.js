const pool = require('../../Services/db');
const moment = require('moment');

module.exports = async function getChat(req, res) {
    try {
        const { userId } = req.params;
        const query = "SELECT * FROM secondhand.messages WHERE userId = ?;";
        const [rows] = await pool.query(query, [userId]);

        if (rows.length === 0) return res.status(404).json({ message: 'No chat found' });

        const response = {
            updatedTime: moment(rows[0].updatedTime).format("YYYY/MM/DD") + ' ' + moment(rows[0].updatedTime).format('LT'),
            userId: rows[0].userID,
            userName: rows[0].userName,
            messages: JSON.parse(rows[0].message).map(msg => ({
                ...msg,
                timeStamp: moment(msg.timeStamp).format("YYYY/MM/DD") + ' ' + moment(msg.timeStamp).format('LT')
            }))
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ message: 'Unexpected error occurred. Please try again.' });
    }
};
