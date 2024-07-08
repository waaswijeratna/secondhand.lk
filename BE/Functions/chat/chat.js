const connection = require('../../Services/connection');
const moment = require('moment');
module.exports = async function chat(req, res){
    console.log(req.body)
    try {

        const {userId, userName, role, message} = req.body;
        const currentDate = new Date();

        const query1 = "SELECT * FROM secondhand.messages WHERE userId = ?";
        const query2 = "INSERT INTO `secondhand`.`messages` (`updatedTime`, `userID`, `userName`, `message`) VALUES (?, ?, ?, ?);";
        const query3 = "UPDATE `secondhand`.`messages` SET `message` = ? WHERE (`userID` = ?);";

        const messageBody = {
            role: role,
            timeStamp: currentDate,
            message: message
        }

        const response = {
            updatedTime: moment(currentDate).format("YYYY/MM/DD")+' '+moment(currentDate).format('LT'),
            userId: userId,
            userName: userName,
            messages: [messageBody]
        }

        req.app.get('io').to(userId).emit('chatStarted', {response: [response]});

        let resp = await queryAsync(query1, userId);

        if(resp.length == 0){
            const values = [
                currentDate,
                userId,
                userName,
                JSON.stringify([messageBody])
            ]
            await queryAsync(query2, values);
        }else{
            const messages = JSON.parse(resp[0].message);
            messages.push(messageBody);
            await queryAsync(query3, [JSON.stringify(messages), userId]);
        }
        
        return res.status(200).json(response);
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ message: 'Unexpected error occurred. Please try again.' });
    }
}

function queryAsync(query, values){
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}