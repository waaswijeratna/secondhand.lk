const pool = require('../../Services/db');
const moment = require('moment');

module.exports = async function getAllChat(req, res) {
    try {
        const query = "SELECT * FROM secondhand.messages;";
        const [rows] = await pool.query(query);

        if (rows.length === 0) return res.status(200).json([]);

        const response = rows.map(r => {
            const element = {
                updatedTime: moment(r.updatedTime).format("YYYY/MM/DD") + ' ' + moment(r.updatedTime).format('LT'),
                userId: r.userID,
                userName: r.userName,
                messages: JSON.parse(r.message).map(msg => ({
                    ...msg,
                    timeStamp: moment(msg.timeStamp).format("YYYY/MM/DD") + ' ' + moment(msg.timeStamp).format('LT')
                }))
            };
            return element;
        });

        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error occurred. Please try again.' });
    }
};
