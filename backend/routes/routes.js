const express = require('express');
const router = express.Router();

//import controll function
const {insertRatings } = require('../Functions/ratingcontroller');
const {insertReporting } = require('../Functions/reportingcontroller');

// POST route for inserting a ratingDetails
//end point
router.post('/ratingDetails', insertRatings);
router.post('/reportingDetails', insertReporting);

module.exports = router;