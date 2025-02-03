const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.render('restaurants/home')
});

router.get('/restaurants', (req, res) => {
    res.send('TEST')
});


module.exports = router;