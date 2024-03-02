const pool = require('../database/db');

// Function to insert membership data into the database
async function createMembership(formData) {
    const { fullname, email, phone, dob, placeofbirth, university, interests, comments } = formData;
    const currentDate = new Date().toISOString();  
    const query = `
        INSERT INTO membership (fullname, email, phone, dob, placeofbirth, university, interests, comments, date_sent)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    const values = [fullname, email, phone, dob, placeofbirth, university, interests, comments, currentDate];
    
    try {
        const result = await pool.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
}

// Function to fetch all membership submissions from the database
async function getAllMemberships() {
    const query = `
        SELECT * FROM membership
        ORDER BY date_sent DESC
    `;
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

// Function to delete a membership submission from the database
async function deleteMembership(submissionId) {
    const query = `
        DELETE FROM membership
        WHERE id = $1
    `;
    const values = [submissionId];
    try {
        const result = await pool.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
} 

// Function to fetch a membership submission by its ID from the database
async function getMembershipById(id) {
    const query = `
        SELECT * FROM membership
        WHERE id = $1
    `;
    const values = [id];
    try {
        const result = await pool.query(query, values);
        return result.rows[0]; 
    } catch (error) {
        throw error;
    }
}

// Function to search membership by name
async function searchMembershipByName(name) {
    const query = `
        SELECT * FROM membership
        WHERE fullname ILIKE $1
    `;
    const values = [`%${name}%`];
    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

// Function to check for existing membership  
async function checkExistingMembership(formData) {
    const { fullname, email, phone } = formData;
    const query = `
        SELECT *
        FROM membership
        WHERE fullname = $1
        OR email = $2
        OR phone = $3
    `;
    const values = [fullname, email, phone];
    try {
        const result = await pool.query(query, values);
        return result.rows.length > 0;  
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createMembership,
    getAllMemberships,
    deleteMembership,
    getMembershipById,
    checkExistingMembership,
    searchMembershipByName
};
