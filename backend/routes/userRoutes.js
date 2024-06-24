const express = require("express");
const passport = require('../middlewares/passport'); // Import the passport configuration
const { createUser, loginUser, ThirdPartyAuth } = require("../controllers/userController");
const { requestPasswordReset, resetPassword } = require("../controllers/passwordController");
const { findUserByEmail } = require("../models/user");

const router = express.Router();

router.post("/createUser", createUser);
router.post("/login", loginUser);
router.post('/requestPasswordReset', requestPasswordReset);
router.post('/resetPassword', resetPassword);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), ThirdPartyAuth);

router.get('/profile', async (req, res, next) => {
    try {
        const user = await findUserByEmail(req.user.email); // Assuming req.user.email is set after authentication
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
