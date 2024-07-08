    const connection = require('../../Services/connection');

    async function getDailyAdCount(req, res) {
        const month = req.query.month; // Expecting month in 'YYYY-MM' format
        let sql = 'SELECT DATE(created_at) AS date_created, COUNT(*) AS ad_count FROM ads';

        if (month) {
            sql += ` WHERE DATE_FORMAT(created_at, '%Y-%m') = '${month}'`;
        }

        sql += ' GROUP BY DATE(created_at) ORDER BY DATE(created_at);';

        connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send("Internal server error");
            } else if (result.length === 0) {
                res.status(404).send("Ad data not found");
            } else {
                res.status(200).send(result);
            }
        });
    }

    module.exports = getDailyAdCount;
