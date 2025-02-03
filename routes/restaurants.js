// Find out if I should have restaurants in a different router?
// app.use('/this is where you select the root route name')



const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.send('TEST')
});

module.exports = router;

