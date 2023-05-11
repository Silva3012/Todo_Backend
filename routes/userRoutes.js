const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { validateJSON } = require('./middleware');

// Register a new user
router.post('/register', validateJSON, userController.register);

// Login a user
router.post('/login', validateJSON, userController.login);

module.exports = router;
