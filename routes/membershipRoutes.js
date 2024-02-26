const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');

// Route for displaying the membership page
router.get('/membership', (req, res) => {
    res.render('membership', { errors: [] });
});

// Route for handling form submission
router.post('/submit-membership', membershipController.submitMembershipForm, );
 

module.exports = router;
