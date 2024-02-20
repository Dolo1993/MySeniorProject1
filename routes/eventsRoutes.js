const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

// Route for displaying events
router.get('/events', eventsController.renderEventsPage);

module.exports = router;
