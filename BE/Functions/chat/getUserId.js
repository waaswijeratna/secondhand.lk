const connection = require('../../Services/connection');

module.exports = async function getUserId(req, res){
    try {
        const query = "SELECT user_id FROM secondhand.user;";

        const resp = await queryAsync(query);

        const response = [];

        if(resp.length == 0)  return res.status(200).json(response);

        for(const user of resp){
            response.push(user.user_id)
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