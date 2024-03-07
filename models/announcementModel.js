// Import the database connection pool
const pool = require('../database/db');

// Function to fetch all announcements
exports.getAllAnnouncements = async () => {
    try {
        const result = await pool.query('SELECT * FROM announcements ORDER BY date DESC');
        return result.rows;
    } catch (error) {
        console.error('Error fetching announcements:', error);
        throw error;
    }
};

// Function to create a new announcement and validation
exports.createAnnouncement = async (title, content) => {
    try {
        if (!title || !content) {
            throw new Error('Title and content are required.');
        }

        // Check if the title already exists
        const existingAnnouncement = await pool.query('SELECT * FROM announcements WHERE title = $1', [title]);
        if (existingAnnouncement.rows.length > 0) {
            throw new Error('Title already exists');
        }
        await pool.query('INSERT INTO announcements (title, content) VALUES ($1, $2)', [title, content]);
    } catch (error) {
        console.error('Error creating announcement:', error);
        throw error;
    }
};

// Function to update an existing announcement and validation
exports.updateAnnouncement = async (id, title, content) => {
    try {
        if (!title || !content) {
            throw new Error('Title and content are required.');
        }

        await pool.query('UPDATE announcements SET title = $1, content = $2, date = CURRENT_TIMESTAMP WHERE id = $3', [title, content, id]);
    } catch (error) {
        console.error('Error updating announcement:', error);
        throw error;
    }
};

// Function to delete an announcement
exports.deleteAnnouncement = async (id) => {
    try {
        await pool.query('DELETE FROM announcements WHERE id = $1', [id]);
    } catch (error) {
        console.error('Error deleting announcement:', error);
        throw error;
    }
};

// Function to fetch an announcement by title
exports.getAnnouncementByTitle = async (title) => {
    try {
        const result = await pool.query('SELECT * FROM announcements WHERE title = $1', [title]);
        return result.rows[0]; // Assuming you want to return the first matching announcement
    } catch (error) {
        console.error('Error fetching announcement by title:', error);
        throw error;
    }
};
