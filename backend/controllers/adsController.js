const db = require('../models/db');

const getAdsByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const sql = 'SELECT * FROM adsTable WHERE postedBy = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching ads:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(200).json(results);
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAdsByUserId };
