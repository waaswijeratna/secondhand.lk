require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const passport = require('./middlewares/passport'); // Import the passport configuration
const userRoutes = require("./routes/userRoutes");
const cookieParser = require('cookie-parser'); // Import cookie-parser

// Middleware to parse JSON bodies
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(cookieParser()); 

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret:  process.env.ACCESS_TOKEN_SECRET,
  cookie: { secure: false } 
}));

app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use("/", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Started on port ${port}...`));


module.exports = app;



