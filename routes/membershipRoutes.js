const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');

// Route for displaying the membership page
router.get('/membership', (req, res) => {
    res.render('membership', { errors: [] });
});

// Route for handling form submission
router.post('/submit-membership', membershipController.submitMembershipForm);

// Route for displaying the membership management page
router.get('/admin/membership', membershipController.displayMembershipManagementPage);

// Route for viewing a specific membership submission
router.get('/admin/view-membership/:id', membershipController.viewMembership);

// Route for downloading a membership form
router.get('/admin/download-membership/:id', membershipController.downloadMembership);

// Route for deleting a membership submission
router.post('/admin/delete-membership', membershipController.deleteMembership);


// Route for displaying the membership management page 
router.get('/admin/membership', membershipController.displayMembershipManagementPage);

// Route for searching membership by name
router.get('/admin/search-membership', membershipController.searchMembershipByName);



module.exports = router;
