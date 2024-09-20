const connection = require('../../Services/connection');
const sendMail = require('./../../Utils/sendMail');
const path = require('path');

async function banedAds(req, res) {
    const adId = req.body.ad_id;
    console.log("Received adId:", adId);
    if (!adId) {
        return res.status(400).json({ message: 'Ad ID is required.' });
    }

    try {
        // Get user email associated with the ad
        const getUserEmailQuery = `
            SELECT u.email 
            FROM user u 
            JOIN ads a ON u.user_id = a.created_by 
            WHERE a.ad_id = ?
        `;

        const [userEmail] = await new Promise((resolve, reject) => {
            connection.query(getUserEmailQuery, [adId], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

        if (!userEmail || !userEmail.email) {
            return res.status(404).json({ message: 'User email not found for this ad.' });
        }

        // Delete the ad
        const deleteQuery = 'DELETE FROM ads WHERE ad_id = ?';
        await new Promise((resolve, reject) => {
            connection.query(deleteQuery, [adId], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

        // Send email
        const htmlTemplatePath = path.resolve(__dirname, '../../Templates/addelete.html');
        const subject = "Your Ad Has Been Removed";
        await sendMail(userEmail.email, subject, htmlTemplatePath);

        res.status(200).json({ message: 'Ad has been deleted and email sent to the user.' });

    } catch (error) {
        console.error('Error in banedAds:', error);
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
}

module.exports = banedAds;