const connection = require('../../Services/connection');

async function getAdCount(req, res) {
    let sql = 'SELECT COUNT(*) AS total_ad_count FROM ads';

    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Internal server error");
        } else {
        
            res.status(200).send(result[0]); 
        }
    });
}

module.exports = getAdCount;
