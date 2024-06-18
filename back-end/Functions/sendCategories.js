const db = require('../Services/db');

const sendCategories = (req, res, next) => {
    db.query('SELECT * FROM category', (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Error fetching categories' });
        } else {
          res.json(results);
        }
      });
}

module.exports = { sendCategories };

