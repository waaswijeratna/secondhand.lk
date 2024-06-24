// middlewares/passport.js
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { findUserByEmail, createUserInDb } = require('../models/user');

// Configure Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: ['profile', 'email']
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Check for existing user or create new
            const existingUser = await findUserByEmail(profile.emails[0].value);
            if (existingUser) {
                return done(null, existingUser);
            }
            console.log(profile);
            const body = {
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                provider: profile.provider
            };
            const newUser = await createUserInDb(body);
            return done(null, newUser);
        } catch (error) {
            console.error('Error during Google authentication:', error);
            return done(error);
        }
    }
));

// Serialize user into session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from session
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;
