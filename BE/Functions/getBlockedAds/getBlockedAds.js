const connection = require('../../Services/connection');
const sendMail = require('./../../Utils/sendMail');
const path = require('path');

async function handleBlockedADs(req, res) {
    if (req.method === 'GET') {
        getBlockedADs(req, res);
    } else if (req.method === 'POST') {
        acceptBlockedAD(req, res);
    } else {
        res.status(405).send("Method Not Allowed");
    }
}

function getBlockedADs(req, res) {
    const sql = 'SELECT * FROM all_ads_view WHERE approved_status = "rejected";';
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error Getting Data");
        } else if (result.length === 0) {
            res.status(404).send("No Ads Found");
        } else {
            res.status(200).send(result);
        }
    });
}

async function acceptBlockedAD(req, res) {
    const adId = req.body.ad_id;
    if (!adId) {
        return res.status(400).json({ message: 'Ad ID is required.' });
    }

    try {
        // Update ad status to approved
        const updateSql = 'UPDATE ads SET approved_status = "approved" WHERE ad_id = ?';
        await new Promise((resolve, reject) => {
            connection.query(updateSql, [adId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
        // Get user email
        const getUserEmailSql = `
            SELECT u.email 
            FROM user u 
            JOIN ads a ON u.user_id = a.created_by 
            WHERE a.ad_id = ?
        `;
        const [userEmail] = await new Promise((resolve, reject) => {
            connection.query(getUserEmailSql, [adId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!userEmail || !userEmail.email) {
            return res.status(404).json({ message: 'User email not found for this ad.' });
        }

        // Send email
        const htmlTemplatePath = path.resolve(__dirname, '../../Templates/republish.html');
        const subject = "Your Ad Has Been Republished";
        await sendMail(userEmail.email, subject, htmlTemplatePath);

        res.status(200).json({ message: 'Ad has been approved and republished. Email sent to the user.' });

    } catch (error) {
        console.error('Error in acceptBlockedAD:', error);
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
}

module.exports = handleBlockedADs;