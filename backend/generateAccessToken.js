const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  const payload = {
    userId: user.userId,
    email: user.email
  };
  console.log('Generating token with payload:', payload);
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

module.exports = generateAccessToken;
