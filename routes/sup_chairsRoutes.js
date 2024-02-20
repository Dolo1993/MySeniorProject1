const express = require('express');
const router = express.Router();
const sup_chairsController = require('../controllers/sup_chairsController');

router.get('/sup_chairs', sup_chairsController.getSup_chairsPage);

module.exports = router;
