const express = require("express");
const router = express.Router();
// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

const passport = require('../middlewares/passport'); 
const { createUser, loginUser } = require("../controllers/userController");
const ThirdPartyAuth = require("../controllers/thirdPartyAuthController");
const getProfile = require("../controllers/getProfileController");
const updateProfile = require("../controllers/updateProfileController");
const { findUserByEmail } = require("../models/user");
const { forgotPassword, resetPassword } = require('../controllers/passwordController');
const { getAdsByUserId,  deleteAds} = require('../controllers/adsController');
const { passwordUpdate } = require('../controllers/passwordUpdate')

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
(req, res) => {
    // res.cookie('token', req.user.token, { httpOnly: true });
    const frontendUrl = `http://localhost:4200/homepage?token=${req.user.token}`;
    res.redirect(frontendUrl);
});


router.get('/profile', async (req, res, next) => {
    try {
        const user = await findUserByEmail(req.user.email); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
});


router.post("/createUser", createUser);
router.post("/login", loginUser);
router.post("/ThirdPartyAuth",ThirdPartyAuth);
router.post('/getProfile', getProfile);
router.put('/updateProfile/:userId',updateProfile);
router.post('/resetPassword/:token', resetPassword);
router.post('/forgotPassword', forgotPassword);
router.get('/user/:userId', getAdsByUserId);
router.delete('/ad/:adId', deleteAds);

router.put('/passwordUpdate/:userId',passwordUpdate);

module.exports = router;
