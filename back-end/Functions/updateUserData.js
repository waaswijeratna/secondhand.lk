const db = require('../Services/db');


const updateUserData = async (req, res) => {
    console.log("triggered");
    try {
      const { userId, firstName, lastName, location, sublocation, email } = req.body;
      console.log("triggered2", userId);
  
      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }
  
      const sql = `
        UPDATE usertable
        SET firstName = ?, lastName = ?, location = ?, subLocation = ?, email = ?
        WHERE userId = ?
      `;
      const values = [firstName, lastName, location, sublocation, email, userId];
  
      await db.query(sql, values);
  
      res.status(200).json({ message: 'User data updated successfully' });
      console.log("User data updated successfully");
    } catch (error) {
      console.error('Error updating user data:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  module.exports = { updateUserData };
  