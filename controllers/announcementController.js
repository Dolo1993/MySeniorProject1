const announcementModel = require('../models/announcementModel');
const pool = require('../database/db');

// Rendering the announcement page
exports.renderAnnouncementPage = (req, res) => {
    pool.query('SELECT * FROM announcements ORDER BY date DESC', (err, result) => {
        if (err) {
            console.error('Error fetching announcements:', err);
            res.status(500).send('Error fetching announcements');
        } else {
            res.render('announcement', { announcements: result.rows });
        }
    });
};

// Rendering the admin announcementManagement page
exports.renderAnnouncementManagementPage = (req, res) => {
    pool.query('SELECT * FROM announcements ORDER BY date DESC', (err, result) => {
        if (err) {
            console.error('Error fetching announcements:', err);
            res.status(500).send('Error fetching announcements');
        } else {
            const errorMessage = req.query.error;  
            res.render('admin/announcementManagement', { announcements: result.rows, error: errorMessage });
        }
    });
}; 

// Function for creating a new announcement
exports.createAnnouncement = async (req, res) => {
    const { title, content } = req.body;
    try {
        // Check if the title already exists
        const existingAnnouncement = await announcementModel.getAnnouncementByTitle(title);
        if (existingAnnouncement) {
            return res.redirect('/admin/announcementManagement?error=Title already exists');
        }
        await announcementModel.createAnnouncement(title, content);
        res.redirect('/admin/announcementManagement');
    } catch (error) {
        console.error('Error creating announcement:', error);
        res.status(500).send('Error creating announcement: ' + error.message);
    }
};


// Function for updating an announcement
exports.updateAnnouncement = async (req, res) => {
    const announcementId = req.params.id;
    const { title, content } = req.body;
    try {
        // Server-side validation
        if (!title || !content) {
            throw new Error('Title and content are required.');
        }

        // Check if the title already exists
        const existingAnnouncement = await announcementModel.getAnnouncementByTitle(title);
        if (existingAnnouncement && existingAnnouncement.id !== announcementId) {
            return res.redirect('/admin/announcementManagement?error=Title already exists');
        }

        await pool.query('UPDATE announcements SET title = $1, content = $2, date = CURRENT_TIMESTAMP WHERE id = $3', [title, content, announcementId]);
        res.redirect('/admin/announcementManagement');
    } catch (error) {
        console.error('Error updating announcement:', error);
        res.status(500).send('Error updating announcement: ' + error.message);
    }
};

// Function for deleting an announcement
exports.deleteAnnouncement = async (req, res) => {
    const announcementId = req.params.id;
    try {
        await pool.query('DELETE FROM announcements WHERE id = $1', [announcementId]);
        res.redirect('/admin/announcementManagement');
    } catch (error) {
        console.error('Error deleting announcement:', error);
        res.status(500).send('Error deleting announcement');
    }
};
