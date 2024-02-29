const pool = require('../database/db');

// Function to insert contact message into the database
async function saveContactMessage(name, email, message) {
    const query = `
        INSERT INTO contact_messages (name, email, message, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *
    `;
    const values = [name, email, message];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Return the inserted row
    } catch (error) {
        throw error;
    }
}

// Function to fetch all contact messages from the database
async function getAllContactMessages() {
    const query = `
        SELECT * FROM contact_messages
    `;
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

// Function to delete a contact message from the database
async function deleteContactMessage(messageId) {
    const query = `
        DELETE FROM contact_messages
        WHERE id = $1
    `;
    const values = [messageId];
    try {
        const result = await pool.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
}

// Function to find existing contact message  
async function findExistingContactMessage(name, email) {
    const query = `
        SELECT * FROM contact_messages
        WHERE name = $1 AND email = $2
    `;
    const values = [name, email];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];  
    } catch (error) {
        throw error;
    }
}

module.exports = { saveContactMessage, getAllContactMessages, deleteContactMessage, findExistingContactMessage };
