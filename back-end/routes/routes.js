const express = require('express');
const router = express.Router();
const { upload, handleFirebaseUpload } = require('../config/multerConfig'); // Import Multer middleware

// Import controller functions
const { createOrUpdateAdvertisement } = require('../Functions/advertisementController');
const { sendCategories } = require('../Functions/sendCategories');
const { sendSubcategories } = require('../Functions/sendSubcategories');
const { sendLocations } = require('../Functions/sendLocations');
const { sendSublocations } = require('../Functions/sendSublocations');
const { sendPromotionDetails } = require('../Functions/sendPromotionDetails');
const { selectedPromotions} = require('../Functions/selectedPromotions');
const { getAdvertisement} = require('../Functions/sendAdData');
const {chatBotFunction} = require('../Functions/chatBotFunction');


///////////////////// Defining Routes ////////////////////////

// POST route for creating a new advertisement generalDetails
router.post('/generalDetails', upload.array('images[]', 6), handleFirebaseUpload, createOrUpdateAdvertisement);
//Define route for payement gateway implementation
router.post('/selectedPromotions',selectedPromotions);
//Define route for chatbot
router.post('/chatBot',chatBotFunction);

// Define routes to fetch categories and subcategories
router.get('/categories', sendCategories);
router.get('/subcategories', sendSubcategories);
// Define routes to fetch locations and sublocations
router.get('/locations', sendLocations);
router.get('/sublocations', sendSublocations);
//define route to fetch advertisement data
router.get('/advertisementData/:ad_id', getAdvertisement);
// Define routes to fetch promotion details
router.get('/promotionDetails', sendPromotionDetails);





module.exports = router;
