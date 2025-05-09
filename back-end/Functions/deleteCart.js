const db = require('../Services/db');

const deleteCart = async (req, res, next) => {
    console.log("triggered");
    try {
        const { cart_id } = req.body;
        console.log("triggered2", cart_id);

        const sql = 'DELETE FROM cart WHERE cart_id = ?';
        const values = [cart_id];

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

module.exports = { deleteCart };
