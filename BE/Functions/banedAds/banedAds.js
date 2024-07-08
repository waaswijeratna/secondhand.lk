const connection = require('../../Services/connection');

async function banedAds(req, res) {
    const adId = req.body.ad_id;
    console.log("Received adId:", adId);

    if (!adId) {
        return res.status(400).json({ message: 'Ad ID is required.' });
    }

    try {
        const query = 'DELETE FROM ads WHERE ad_id = ?';
        connection.query(query, [adId], (error, results) => {
            if (error) {
                console.error('Error deleting ad:', error);
                return res.status(500).json({ message: 'Failed to delete ad. Please try again.' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Ad not found.' });
            }

            res.status(200).json({ message: 'Ad has been deleted.' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'Unexpected error occurred. Please try again.' });
    }
}

module.exports = banedAds;
