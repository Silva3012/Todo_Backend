const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateJSON, checkLoggedIn, checkGmailAccount, checkTaskTitleLimit } = require('./middleware');

// GET all tasks
router.get('/', (req, res, next) => {
  checkLoggedIn(req, res, () => {
    taskController.getAllTasks(req, res, next);
  });
});

// GET a specific task
router.get('/:id', (req, res, next) => {
  checkLoggedIn(req, res, () => {
    taskController.getTaskById(req, res, next);
  });
});

// CREATE a new task
router.post('/', (req, res, next) => {
  validateJSON(req, res, () => {
    checkLoggedIn(req, res, () => {
      checkGmailAccount(req, res, () => {
        checkTaskTitleLimit(req, res, () => {
          taskController.createTask(req, res, next);
        });
      });
    });
  });
});

// UPDATE an existing task
router.patch('/:id', (req, res, next) => {
  validateJSON(req, res, () => {
    checkLoggedIn(req, res, () => {
      checkTaskTitleLimit(req, res, () => {
        taskController.updateTask(req, res, next);
      });
    });
  });
});

// DELETE a task
router.delete('/:id', (req, res, next) => {
  checkLoggedIn(req, res, () => {
    taskController.deleteTask(req, res, next);
  });
});

module.exports = router;
