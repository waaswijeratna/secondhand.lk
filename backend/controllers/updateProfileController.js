const { findUserById, updateUserProfileById } = require('../models/user');
const bcrypt = require("bcrypt");

async function updateProfile(req, res) {
  const userId = req.params.userId;
  const { firstName, lastName, location, subLocation } = req.body;

  if (!userId || (!firstName && !lastName  && !location && !subLocation )) {
    return res.status(400).json({ message: 'User ID and at least one field to update are required' });
  }

  try {
    const existingUser = await findUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }


    const updateFields = {};
    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;
    // if (password) {
    //   const saltRounds = 10;
    //   const hashedPassword = await bcrypt.hash(password, saltRounds);
    //   updateFields.password = hashedPassword;
    // }
    if (location) updateFields.location = location;
    if (subLocation) updateFields.subLocation = subLocation;

    await updateUserProfileById(userId, updateFields);

    const updatedUser = await findUserById(userId);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = updateProfile;
