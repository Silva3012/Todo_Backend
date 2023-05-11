// Importing the jsonwebtoken library to verify JWT tokens
const jwt = require('jsonwebtoken');

// Middleware function to validate that the request is of JSON content type
const validateJSON = (req, res, next) => {
  if (req.headers['content-type'] !== 'application/json') {
    return res.status(400).json({ message: 'Invalid request content type' });
  }
  next();
};

// Middleware function to verify the authenticity of a JWT token
const verifyToken = (req, res, next) => {
    // Checking the Authorization header for the presence of a JWT token
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Extracting the token from the Authorization header
    const token = authHeader.split(' ')[1];
    // Verifying the token with the JWT_SECRET environment variable
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: invalid or expired token' });
      }
      // Storing the decoded token payload in the request object
      req.user = user;
      next();
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
  if (!req.user.email.endsWith('@gmail.com')) {
    return res.status(403).json({ message: 'Forbidden: only Gmail accounts allowed' });
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
