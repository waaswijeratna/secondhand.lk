const express = require('express')
const router = express.Router() // Create a router instance

//components
const getAdList = require('../components/getAdList/getAdList')
const cart = require('../components/getAdList/cart');
const displaycart = require('../components/getAdList/displaycart');

router.get('/getadlist',(req, res) =>{
    getAdList(req, res)      // Call the getAdList component with request and response objects
});
router.post('/cart',(req, res) =>{
    cart(req, res)      // Call the getAdList component with request and response objects
});

router.get('/displayCart',(req, res) =>{
    displaycart(req, res)      // Call the getAdList component with request and response objects
});



module.exports = router
