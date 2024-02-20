const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');

router.get('/membership', membershipController.getMembershipPage);

module.exports = router;
