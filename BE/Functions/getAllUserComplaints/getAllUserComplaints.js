const connection = require('../../Services/connection');

async function getAllUserComplaints(req, res) {
    const sql = `
    SELECT
        r.ad_id AS advertisement_id,
        COUNT(*) AS total_complaints,
        DATE_FORMAT(MAX(r.reported_time), '%Y-%m-%d %H:%i:%s') AS latest_complaint_date,
        lr.latest_complaint_type AS complaint_type,
        lr.latest_complaint_description AS complaint_description,
        DATE_FORMAT(MIN(r.reported_time), '%Y-%m-%d %H:%i:%s') AS earliest_complaint_date
    FROM
        reporting r
    JOIN (
        SELECT
            ad_id,
            reason AS latest_complaint_type,
            reportreview AS latest_complaint_description,
            reported_time
        FROM
            reporting
        WHERE
            (ad_id, reported_time) IN (
                SELECT
                    ad_id,
                    MAX(reported_time)
                FROM
                    reporting
                GROUP BY
                    ad_id
            )
    ) lr ON r.ad_id = lr.ad_id
    GROUP BY
        r.ad_id,
        lr.latest_complaint_type,
        lr.latest_complaint_description;
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json('Internal Server Error');
        } else {
            return res.status(200).json(result);
        }
    });
}

module.exports = getAllUserComplaints;