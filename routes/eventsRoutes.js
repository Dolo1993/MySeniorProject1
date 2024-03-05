const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

// Route for displaying events
router.get('/events', eventsController.renderEventsPage);

// Route for displaying event management page
router.get('/admin/event', eventsController.renderEventManagementPage);

// Route for creating a new event
router.post('/admin/event/create', eventsController.createEvent);

// Route for updating an existing event
router.post('/admin/event/update/:id', (req, res, next) => {
    console.log('Received update event request:', req.body);  
    next();  
}, eventsController.updateEvent);

// Route for deleting an event
router.post('/admin/event/delete/:id', eventsController.deleteEvent);

module.exports = router;
