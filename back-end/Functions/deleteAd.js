const db = require('../Services/db');

const deleteAd = async (req, res, next) => {
    console.log("triggered");
    try {
        const { ad_id } = req.body;
        console.log("triggered2", ad_id);

        const sql = 'DELETE FROM ads WHERE ad_id = ?';
        const values = [ad_id];

        const [results] = await db.query(sql, values); // assuming you're using a library like mysql2 or similar which returns an array

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item deleted successfully' });
        console.log("results", results);
    } catch (error) {
        console.error('Error in deleteCart function:', error);
        res.status(500).send('Server error');
    }
};

module.exports = { deleteAd };
