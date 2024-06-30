const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  // let userEmail;
  // if (googleUser.emails && googleUser.emails.length > 0) {
  //   userEmail = googleUser.emails[0].value;
  // } else {
  //   userEmail = googleUser.email; // Fallback to googleUser.email if emails array is not available
  // }

  const payload = {
    userId: user.id,
    email: user.email
  };
  console.log('Generating token with payload:', payload);

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

module.exports = generateAccessToken;
