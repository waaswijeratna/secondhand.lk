const db = require('../models/db');
const express = require('express');
const app = express();

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

// const deleteAd = async (req, res) => {
//   const adId = req.params.adId;
//   const userId = req.query.userId;

//   try {
//     console.log(`Deleting ad with id ${adId} for user with id ${userId}`);

//     const sql = 'DELETE FROM adsTable WHERE id = ? AND postedBy = ?';
//     console.log('SQL Query:', sql); 
//     db.query(sql, [adId, userId], (err, result) => {
//       if (err) {
//         console.error('Error deleting ad:', err);
//         return res.status(500).json({ message: 'Internal server error' });
//       }
//       if (result.affectedRows === 0) {
//         console.log('No ad deleted or unauthorized deletion');
//         return res.status(404).json({ message: 'Ad not found or not authorized' });
//       }
//       console.log('Ad deleted successfully');
//       res.status(200).json({ message: 'Ad deleted successfully' });
//     });
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

const deleteAds = async (req, res) =>{
  const id = req.params.id;

  try {
    const sql = 'DELETE FROM adsTable WHERE id =?';
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Error deleting ad:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(200).json({ message: 'Ad deleted successfully' });
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { getAdsByUserId, deleteAds };
