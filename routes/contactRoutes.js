const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route for displaying the contact page
router.get('/contact', contactController.getContactPage);

// Route for handling form submission
router.post('/submit-contact', contactController.submitContactForm);

module.exports = router;
