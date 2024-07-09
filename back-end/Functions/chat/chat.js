const pool = require('../../Services/db');
const moment = require('moment');

module.exports = async function chat(req, res){
    console.log('Request body:', req.body);
    try {
        const { userId, userName, role, message } = req.body;
        const currentDate = new Date();

        const query1 = "SELECT * FROM secondhand.messages WHERE userId = ?";
        const query2 = "INSERT INTO secondhand.messages (updatedTime, userID, userName, message) VALUES (?, ?, ?, ?);";
        const query3 = "UPDATE secondhand.messages SET message = ? WHERE (userID = ?);";

        const messageBody = {
            role: role,
            timeStamp: currentDate,
            message: message
        };

        const response = {
            updatedTime: moment(currentDate).format("YYYY/MM/DD") + ' ' + moment(currentDate).format('LT'),
            userId: userId,
            userName: userName,
            messages: [messageBody]
        };

        console.log('Emitting chatStarted event with response:', response);
        req.app.get('io').to(userId).emit('chatStarted', { response: [response] });

        let resp = await queryAsync(query1, [userId]);

        if (resp.length == 0) {
            const values = [
                currentDate,
                userId,
                userName,
                JSON.stringify([messageBody])
            ];
            await queryAsync(query2, values);
            console.log('Inserted new message for userId:', userId);
        } else {
            const messages = JSON.parse(resp[0].message);
            messages.push(messageBody);
            await queryAsync(query3, [JSON.stringify(messages), userId]);
            console.log('Updated message for userId:', userId);
        }

        return res.status(200).json(response);
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ message: 'Unexpected error occurred. Please try again.' });
    }
}

async function queryAsync(query, values) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(query, values);
        return rows;
    } catch (err) {
        throw err;
        
    } finally {
        if (connection) connection.release();
    }
}
