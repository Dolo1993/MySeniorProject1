const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route for displaying the contact page
router.get('/contact', contactController.getContactPage);

// Route for handling form submission
router.post('/submit-contact', contactController.submitContactForm);  

// Route for displaying contact messages page
router.get('/admin/contact-messages', contactController.displayContactMessagesPage);

// Route for deleting a contact message
router.post('/admin/delete-message', contactController.deleteContactMessage);


module.exports = router;
