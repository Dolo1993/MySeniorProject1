const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// Renders the login page    
exports.getLoginPage = (req, res) => {
    const error = req.query.error;  
    const successMessage = req.query.successMessage;  
    res.render('login', { error, successMessage });  
};

// Renders the register page  
exports.getRegisterPage = (req, res) => {
    const error = req.query.error;  
    const successMessage = req.query.successMessage;  
    res.render('register', { error, successMessage });  
};

// Handles user login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.render('login', { error: 'Username and password are required' });
        }

        const user = await userModel.authenticateUser(username, password);
        if (user && user.authenticated) {
            req.session.user = user.user;
            if (user.user.role === 'admin') {
                return res.redirect('/admin/SUPManagement');
            } else {
                return res.render('login', { error: 'You are not authorized to access this page, please contact Management.' });
            }
        } else {
            return res.render('login', { error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Login failed:', error);  
        res.status(404).send('404 Server Error');
    }
};

// Handles user registration
exports.register = async (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    // Check if username already exists
    try {
        const existingUser = await userModel.findUserByUsername(username);
        if (existingUser) {
            return res.status(400).send('Username is already taken');
        }

        // Create new user
        await userModel.createUser(username, password);
        const successMessage = `${username} you are registered successfully, please login`;
        return res.redirect(`/admin/login?successMessage=${encodeURIComponent(successMessage)}`);
    } catch (error) {
        console.error('Registration failed:', error);
        return res.status(404).send('404 Server Error');
    }
};
