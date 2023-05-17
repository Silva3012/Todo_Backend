// Importing the jsonwebtoken library to verify JWT tokens
const mongoose = require('mongoose'); // Need this so that I can access the email field
const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware function to validate that the request is of JSON content type
const validateJSON = (req, res, next) => {
  if (req.headers['content-type'] !== 'application/json') {
    return res.status(400).json({ message: 'Invalid request content type' });
  }
  next();
};

// Middleware function to verify the authenticity of a JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, config.secretKey, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: invalid or expired token' });
      }
      try {
        const User = mongoose.model('User');
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(401).json({ message: 'Unauthorized: user not found' });
        }
        req.user = {
          _id: user._id,
          email: user.email
        };
        console.log('User:', req.user);
        next();
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
      }
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized: no token provided' });
  }
};

// Middleware function to check if a user is logged in
const checkLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: please log in' });
  }
  next();
};

// Middleware function to check if a user has a Gmail account
const checkGmailAccount = (req, res, next) => {
  const email = req.body.email;

  if (!email.endsWith('@gmail.com')) {
    return res.status(400).json({ message: 'Only Gmail accounts are allowed' });
  }

  next();
};


// Middleware function to check if a task title is within the character limit
const checkTaskTitleLimit = (req, res, next) => {
  if (req.body.title && req.body.title.length > 140) {
    return res.status(400).json({ message: 'Task title exceeds character limit' });
  }
  next();
};

// Exporting all the middleware functions as an object
module.exports = { validateJSON, verifyToken, checkLoggedIn, checkGmailAccount, checkTaskTitleLimit };
