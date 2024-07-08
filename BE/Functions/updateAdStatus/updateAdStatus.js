const connection = require('../../Services/connection');
const sendMail = require('./../../Utils/sendMail');
const path = require('path');

async function updateAdStatus(req, res) {
    const ad_id = req.params.ad_id;
    const status = req.body.status;
    const sql = 'UPDATE `secondhand`.`ads` SET `approved_status` = ? WHERE (`ad_id` = ?);';
    const getUserSql = 'SELECT created_by FROM ads WHERE ad_id = ?';
    const getEmailSql = 'SELECT email FROM user WHERE user_id = ?';

    try {
        // Update ad status
        await new Promise((resolve, reject) => {
            connection.query(sql, [status, ad_id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });

        // Get user ID
        const userIdResult = await new Promise((resolve, reject) => {
            connection.query(getUserSql, [ad_id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });

        const user_id = userIdResult[0].created_by;

        // Get user email
        const emailResult = await new Promise((resolve, reject) => {
            connection.query(getEmailSql, [user_id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });

        const email = emailResult[0].email;

        // Determine the appropriate HTML template path based on the status
        const templateFileName = status === 'approved' ? 'adaccept.html' : 'rejectad.html';
        const htmlTemplatePath = path.resolve(__dirname, `../../Templates/${templateFileName}`);

        // Send email
        const subject = "Your Ad Status Update";

        await sendMail(email, subject, htmlTemplatePath);

        res.status(200).json("Email sent successfully");

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error.');
    }
}

module.exports = updateAdStatus;
