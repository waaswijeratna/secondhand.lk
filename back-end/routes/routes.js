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
const {searchFunction} = require('../Functions/searchFunction');
const {sendCategoryDetails} = require('../Functions/sendCategoryDetails');
const {insertRatings } = require('../Functions/ratingcontroller');
const {insertReporting } = require('../Functions/reportingcontroller');
const {insertToCart} = require('../Functions/insertToCart');
const { getCartData } = require('../Functions/getCartData');
const {deleteCart} = require('../Functions/deleteCart');


///////////////////// Defining Routes ////////////////////////

// POST route for creating a new advertisement generalDetails
router.post('/generalDetails', upload.array('images[]', 6), handleFirebaseUpload, createOrUpdateAdvertisement);
//Define route for payement gateway implementation
router.post('/selectedPromotions',selectedPromotions);
//Define route for chatbot
router.post('/chatBot',chatBotFunction);
//define search routing
router.post('/search',searchFunction);
//define search routing
router.post('/categoryDetails',sendCategoryDetails);
//define inserting to cart
router.post('/insert_cart',insertToCart);
// Define route for fetching cart data
router.post('/getCart', getCartData);
// Define route for delete cart item
router.post('/deleteCart', deleteCart);

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
//routes for reporting and ratings
router.post('/ratingDetails', insertRatings);
router.post('/reportingDetails', insertReporting);





module.exports = router;
