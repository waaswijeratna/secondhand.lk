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

const deleteAd = async (req, res) => {
  const userId = req.params.userId;
  const adId = req.body.adId;

  try {
    const sql = 'DELETE FROM adsTable WHERE id = ? AND postedBy = ?';
    db.query(sql, [adId, userId], (err, result) => {
      if (err) {
        console.error('Error deleting ad:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Ad not found or not authorized' });
      }
      res.status(200).json({ message: 'Ad deleted successfully' });
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const modifyAd = async (req, res) => {
  const userId = req.params.userId;
  const adId = req.body.adId;
  const { title, description, price, location, image } = req.body;

  try {
    const sql = 'UPDATE adsTable SET title = ?, description = ?, price = ?, location = ?, image = ? WHERE id = ? AND postedBy = ?';
    db.query(sql, [title, description, price, location, image, adId, userId], (err, result) => {
      if (err) {
        console.error('Error modifying ad:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Ad not found or not authorized' });
      }
      res.status(200).json({ message: 'Ad modified successfully' });
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { getAdsByUserId, deleteAd, modifyAd };
