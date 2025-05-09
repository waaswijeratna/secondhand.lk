const db = require('../Services/db');

const sendCategories = async (req, res, next) => {
    try {
        const [results] = await db.query('SELECT * FROM category');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching categories' });
    }
};

module.exports = { sendCategories };
