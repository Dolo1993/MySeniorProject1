const express = require('express');
const router = express.Router();

const aboutController = require('../controllers/aboutController');

// route for the aboutsup page
router.get('/about', aboutController.aboutPage);

 
module.exports = router;
