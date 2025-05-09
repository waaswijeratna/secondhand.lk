const db = require('../Services/db');

const getUserData = async (req, res, next) => {
    console.log("triggered");
    try {
        const { userId } = req.body;
        console.log("triggered2", userId);

        if (!userId) {
            return res.status(400).send('userId is required');
        }

        const sql = 'SELECT * FROM usertable WHERE userId = ?';
        const values = [userId];

        const results = await db.query(sql, values)

        res.status(200).json(results);
        console.log("results", results);
    } catch (error) {
        console.error('Error in getCartData function:', error);
        res.status(500).send('Server error');
    }
};

module.exports = {getUserData};
