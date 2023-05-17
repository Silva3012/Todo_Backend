const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { validateJSON, checkGmailAccount } = require('./middleware');

// Register a new user
router.post('/register', validateJSON, checkGmailAccount, userController.register);

// Login a user
router.post('/login', validateJSON, checkGmailAccount, userController.login);

module.exports = router;
