// Importing the Mongoose library
const mongoose = require('mongoose');

// Defining a new Mongoose schema for the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Creating a Mongoose model for the User schema
const User = mongoose.model('User', userSchema);

// Exporting the User model for use in other parts of the application
module.exports = User;
