require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());


// Middleware to parse JSON bodies
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Started on port ${port}...`));
