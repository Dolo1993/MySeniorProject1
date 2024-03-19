const db = require('../database/db');
const bcrypt = require('bcrypt');

// Checks if a user already exists by username
exports.checkUserExists = async (username) => {
    try {
        const query = 'SELECT COUNT(*) FROM users WHERE username = $1'; 
        const { rows } = await db.query(query, [username]);  
        return parseInt(rows[0].count) > 0;  
    } catch (error) {
        throw new Error('Error checking user existence');
    }
};

// Creates a new user with default role 'member'
exports.createUser = async (username, password) => {
    try {
        const userExists = await exports.checkUserExists(username);
        if (userExists) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
        const query = 'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *';  
        const values = [username, hashedPassword, 'member'];  
        const { rows } = await db.query(query, values);  
        return rows[0];  
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);  
    }
};

// Finds a user by username
exports.findUserByUsername = async (username) => {
    try {
        const query = 'SELECT * FROM users WHERE username = $1'; 
        const { rows } = await db.query(query, [username]);  
        return rows[0];  
    } catch (error) {
        throw new Error('Error finding user');  
    }
};

// Authenticates user by username and password
exports.authenticateUser = async (username, password) => {
    try {
        const user = await exports.findUserByUsername(username);  
        if (user && await bcrypt.compare(password, user.password)) { 
            return { authenticated: true, user };  
        } else {
            return { authenticated: false, message: 'Invalid username or password' };  
        }
    } catch (error) {
        throw new Error('Authentication failed'); 
    }
};
