const db = require('../Services/db');

const getUserReviews = async (req, res, next) => {
    console.log("triggered");
    try {
        const { userId } = req.body;
        console.log("triggered2", userId);

        if (!userId) {
            return res.status(400).send('userId is required');
        }

        const sql = 'SELECT * FROM userratings WHERE user_id = ?';
        const values = [userId];

        const results = await db.query(sql, values)

        res.status(200).json(results);
        console.log("results", results);
    } catch (error) {
        console.error('Error in user review function:', error);
        res.status(500).send('Server error');
    }
};

module.exports = {getUserReviews};
