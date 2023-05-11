// Importing the Mongoose library
const mongoose = require('mongoose');

// Defining a new Mongoose schema for the Task model
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Creating a Mongoose model for the Task schema
const Task = mongoose.model('Task', taskSchema);

// Exporting the Task model for use in other parts of the application
module.exports = Task;
