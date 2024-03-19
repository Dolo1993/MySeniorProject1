 const eventModel = require('../models/eventModel');

// Render the events page
exports.renderEventsPage = async (req, res) => {
    try {
        // Fetch all events from the database
        const events = await eventModel.getAllEvents();
        res.render('events', { events });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(404).send('404 Server Error');
    }
};

// Render the event management page
exports.renderEventManagementPage = async (req, res) => {
    try {
        // Fetch all events from the database
        const events = await eventModel.getAllEvents();
        res.render('admin/event', { events });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(404).send('404 Server Error');
    }
};

// Create a new event
exports.createEvent = async (req, res) => {
    try {
        const { title, date, time, description } = req.body;
        console.log(req.body)

        // Create the new event in the database
        await eventModel.createEvent(title, date, time, description);

        // Redirect to the event management page
        res.redirect('/admin/event');
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(404).send('404 Server Error');
    }
};

// Update an existing event
exports.updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { title, date, time, description } = req.body;

        // Update the event in the database  
        await eventModel.updateEvent(eventId, title, date, time, description);

        // Redirect to the event management page
        res.redirect('/admin/event');
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(404).send('404 Server Error');
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        // Delete the event from the database
        await eventModel.deleteEvent(eventId);

        // Redirect to the event management page
        res.redirect('/admin/event');
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(404).send('404 Server Error');
    }
};

module.exports = exports;
