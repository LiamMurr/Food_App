const express = require("express");
const router = express.Router();
const Restaurants = require('../models/restaurant.js')


router.get('/', (req, res) => {
    res.render('restaurants/home')
});

router.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurants.find({});
    console.log(restaurants);
    res.render('restaurants/show', { restaurants })
});


module.exports = router;