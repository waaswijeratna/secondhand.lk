const connection = require('../../Services/connection');
const moment = require('moment');

module.exports = async function getChat(req, res){
    try {
        const {userId} = req.params;
        const query = "SELECT * FROM secondhand.messages WHERE userId = ?;";
        const resp = await queryAsync(query, userId);
        
        if(resp.length == 0) return res.status(404).json({message: 'No chat found'});

        let response = {
            updatedTime: moment(resp[0].updatedTime).format("YYYY/MM/DD")+' '+moment(resp[0].updatedTime).format('LT'),
            userId: resp[0].userID,
            userName: resp[0].userName,
            messages: []
        }

        const messages = JSON.parse(resp[0].message);

        //Format date and time of each message
        for(const msg of messages){
            msg.timeStamp = moment(msg.timeStamp).format("YYYY/MM/DD")+' '+moment(msg.timeStamp).format('LT')
            response.messages.push(msg);
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