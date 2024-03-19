const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.get('/login', authController.getLoginPage);
router.post('/login', authController.login); 

// Registeration route
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.register);


module.exports = router;
