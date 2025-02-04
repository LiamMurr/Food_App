const express = require("express");
const router = express.Router();
const Restaurants = require('../models/restaurant.js')


router.get('/', (req, res) => {
    res.render('restaurants/home')
});

router.get('/restaurants', async (req, res) => {
    const restaurant = await Restaurants.findOne({ name : "Middle Eastern Magic" });
    console.log(restaurant.name);
    res.render('restaurants/show', { restaurant })
});


module.exports = router;