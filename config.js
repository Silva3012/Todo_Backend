const crypto = require('crypto');

// Generate a random secret key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Export the secret key
module.exports = {
  secretKey: generateSecretKey(),
};

/*
Implemented this after getting this error:
=========
Error: secretOrPrivateKey must have a value
    at Object.module.exports [as sign] (/Users/ntsikasilvano/Express Web Framework/to-do/backend/node_modules/jsonwebtoken/sign.js:105:20)
    at login (/Users/ntsikasilvano/Express Web Framework/to-do/backend/controllers/UserController.js:55:23)
POST /users/login 500 310.003 ms - 34
=============
The secret key is an essential part of JWT-based authentication. It is used to sign and verify the authenticity of the tokens.

Without a secret key, the tokens cannot be properly validated, and the authentication process will not work correctly.

Using a secret key is a best practice for securing JWT tokens and ensuring that they haven't been tampered with. It adds an extra layer of security to our authentication system.
*/