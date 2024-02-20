const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

// Route for displaying announcements
router.get('/announcement', announcementController.renderAnnouncementPage);

module.exports = router;
