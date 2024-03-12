const express = require('express');
const router = express.Router();
const supManagementController = require('../controllers/supManagementController');

// Route for SUP Management
router.get('/SUPManagement', supManagementController.getSupManagementPage);

// Route to delete membership
router.post('/delete-membership', supManagementController.deleteMembershipSubmission);

// Route to delete contact message
router.post('/delete-message', supManagementController.deleteContactMessage);

module.exports = router;
 
 