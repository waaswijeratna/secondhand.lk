const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findUserByEmail, createUserInDb } = require('../models/user');
const generateAccessToken = require('../generateAccessToken');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },  
  async (_accessToken, _refreshToken, profile, done) => {
    try {
      // Check for existing user or create a new user
      const existingUser = await findUserByEmail(profile.emails[0].value);
      console.log(profile);
      if (existingUser) {
        const token = generateAccessToken({
          userId: existingUser.userId,
          email: existingUser.email
        });
        return done(null, { user: existingUser, token });
        
    } else{
        // If user doesn't exist, create a new user in your database
        const newUser = await createUserInDb({
            userId: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            provider: profile.provider
          });
          const token = generateAccessToken({
            userId: newUser.userId,
            email: newUser.email
          });
           // Return the user and token
            return done(null, { user: newUser, token });
        }
    

    //   const newUser = await createUserInDb(body);
    //   const token = generateAccessToken({ userId: newUser.userId, email: newUser.email });
    //   return done(null, { user: newUser, token });
    } catch (error) {
        console.error('Error during Google authentication:', error);
        return done(error);
      }
  }
));

passport.serializeUser((user, done) => {
  done(null,  user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
})


module.exports = passport;
