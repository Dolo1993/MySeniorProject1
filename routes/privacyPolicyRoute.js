const express = require('express');
const router = express.Router();
const privacyPolicyController = require('../controllers/privacyPolicyController');

// Route for privacy policy
router.get('/privacy-policy', privacyPolicyController.privacyPolicy_get);

module.exports = router;
