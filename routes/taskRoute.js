const express = require('express');
const router = express.Router();
const {getTasks, getTaskById, createTask, deleteTaskById, updateTaskById} = require('../controllers/taskController');
const checkAuthMiddleware = require('../middlewares/checkAuthMiddleware');

// check user authentication 
router.use(checkAuthMiddleware);

// get all the tasks
router.get('/', getTasks);

// get a single task
router.get('/:id', getTaskById);

// create a task
router.post('/', createTask);

// delete a task
router.delete('/:id', deleteTaskById);

//update a task
router.patch('/:id', updateTaskById);

module.exports = router;