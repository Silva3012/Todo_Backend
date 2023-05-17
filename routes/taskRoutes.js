const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateJSON, checkLoggedIn, checkGmailAccount, checkTaskTitleLimit, verifyToken } = require('./middleware');

// GET all tasks
router.get('/', verifyToken, validateJSON, (req, res, next) => {
  checkLoggedIn(req, res, () => {
    taskController.getAllTasks(req, res, next);
  });
});


// GET a specific task
router.get('/:id', verifyToken, (req, res, next) => {
  checkLoggedIn(req, res, () => {
    taskController.getTaskById(req, res, next);
  });
});

// CREATE a new task
router.post('/', verifyToken, (req, res, next) => {
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
router.patch('/:id', verifyToken, (req, res, next) => {
  validateJSON(req, res, () => {
    checkLoggedIn(req, res, () => {
      checkTaskTitleLimit(req, res, () => {
        taskController.updateTask(req, res, next);
      });
    });
  });
});

// DELETE a task
router.delete('/:id', verifyToken, checkGmailAccount, (req, res, next) => {
  checkLoggedIn(req, res, () => {
    taskController.deleteTask(req, res, next);
  });
});

module.exports = router;
