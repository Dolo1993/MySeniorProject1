const pool = require('../database/db');

// Function to insert membership data into the database
async function createMembership(formData) {
    const { fullname, email, phone, dob, placeofbirth, university, interests, comments } = formData;
    const query = `
    INSERT INTO membership (fullname, email, phone, dob, placeofbirth, university, interests, comments)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
`;
    const values = [fullname, email, phone, dob, placeofbirth, university, interests, comments];
    
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


 

module.exports = {createMembership, getAllMemberships, deleteMembership};
