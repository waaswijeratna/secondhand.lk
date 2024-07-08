const connection = require('../../Services/connection');

async function getRevenue(req, res) {
    let sql = 'SELECT SUM(Total_amount) AS Total_amount FROM promotions_payment';

    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Internal server error");
        } else {
          
            res.status(200).send(result[0]); 
        }
    });
}

module.exports = getRevenue;
