const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

// Validation middleware for creating and updating announcements
const validateAnnouncementInput = (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send('Title and content are required.');
    }
    next();
};

// Route for announcements
router.get('/announcement', announcementController.renderAnnouncementPage);

// Route for creating a new announcement with validation middleware
router.post('/admin/announcement/create', validateAnnouncementInput, announcementController.createAnnouncement);

// Route for updating an announcement with validation middleware
router.post('/admin/announcement/:id/update', validateAnnouncementInput, announcementController.updateAnnouncement);

// Route for deleting an announcement
router.post('/admin/announcement/:id/delete', announcementController.deleteAnnouncement);

// Route for displaying announcement management page
router.get('/admin/announcementManagement', announcementController.renderAnnouncementManagementPage);

module.exports = router;
