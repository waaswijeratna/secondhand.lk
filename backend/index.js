const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const db = require('./Services/db');

// Initialize Express and Set Port
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.use('/api', routes); // Mount API routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error to console for debugging
    res.status(500).json({ error: 'Internal Server Error', message: err.message }); // Send error response to client
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});