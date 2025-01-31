const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.render('restaurants/index')
});

module.exports = router;