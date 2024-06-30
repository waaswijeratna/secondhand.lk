const db = require('../Services/db');

const insertToCart = async (req, res, next) => {
    try {
        const { ad_id, userId } = req.body;

        if (!ad_id || !userId) {
            return res.status(400).send('ad_id and userId are required');
        }

        const sql = 'INSERT INTO cart (ad_id, userId) VALUES (?, ?)';
        const values = [ad_id, userId];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error inserting into cart:', err);
                return res.status(500).send('Server error');
            }
            res.send('Ad added to cart');
        });
    } catch (error) {
        console.error('Error in insertToCart function:', error);
        res.status(500).send('Server error');
    }
};

module.exports = { insertToCart }; 