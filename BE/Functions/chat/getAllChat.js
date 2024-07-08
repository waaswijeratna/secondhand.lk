    const connection = require('../../Services/connection');
    const moment = require('moment');

    module.exports = async function getAllChat(req, res){
        try {
            const query = "SELECT * FROM secondhand.messages;";

            const response = [];

            const resp = await queryAsync(query);

            if (resp.length == 0) return res.status(200).json(response);

            for(const r of resp){
                console.log(r);
                const element = {
                    updatedTime:"",
                    userId:"",
                    userName: "",
                    messages: []
                };
                element.updatedTime = moment(r.updatedTime).format("YYYY/MM/DD")+' '+moment(r.updatedTime).format('LT');
                element.userId = r.userID;
                element.userName = r.userName;
                const arr = JSON.parse(r.message);
                for(const msg of arr){
                    msg.timeStamp = moment(msg.timeStamp).format("YYYY/MM/DD")+' '+moment(msg.timeStamp).format('LT');
                    element.messages.push(msg);
                }
                response.push(element);
            }

            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
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