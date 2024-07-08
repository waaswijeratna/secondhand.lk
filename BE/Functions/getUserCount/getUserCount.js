const connection = require('../../Services/connection');

async function getUserCount(req, res) {
    let sql = 'SELECT COUNT(*) AS total_user_count FROM usertable';

    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Internal server error");
        } else {
            
            res.status(200).send(result[0]); 
        }
    });
}

module.exports = getUserCount;
