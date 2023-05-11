const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const { validateJSON, checkLoggedIn, checkGmailAccount, checkTaskTitleLimit } = require('../middleware');

// GET all tasks
router.get('/', checkLoggedIn, (req, res) => {
  Task.find({ user: req.user._id })
    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).json({ message: err.message }));
});

// GET a specific task
router.get('/:id', checkLoggedIn, (req, res) => {
  Task.findOne({ _id: req.params.id, user: req.user._id })
    .then(task => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    })
    .catch(err => res.status(500).json({ message: err.message }));
});

// CREATE a new task
router.post('/', validateJSON, checkLoggedIn, checkGmailAccount, checkTaskTitleLimit, (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    user: req.user._id
  });
  task.save()
    .then(result => res.json(result))
    .catch(err => res.status(400).json({ message: err.message }));
});

// UPDATE an existing task
router.patch('/:id', validateJSON, checkLoggedIn, checkTaskTitleLimit, (req, res) => {
  Task.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
    .then(task => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    })
    .catch(err => res.status(400).json({ message: err.message }));
});

// DELETE a task
router.delete('/:id', checkLoggedIn, (req, res) => {
  Task.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    .then(task => {
      if (task) {
        res.json({ message: 'Task deleted' });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    })
    .catch(err => res.status(500).json({ message: err.message }));
});

module.exports = router;
