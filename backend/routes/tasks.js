const express = require('express');
const router = express.Router();
const {
  validateCreateTask,
  validateUpdateTask,
} = require('../middleware/validation');

let tasks = [];

router.get('/', (req, res) => {
  res.status(200).json(tasks);
});

router.post('/', validateCreateTask, (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  // Generate a unique ID for the new task (using timestamp for simplicity) ,beacause we are not using a database
  const newTask = {
    id: Date.now(),
    title,
    description: description || '',
    priority: priority || 'medium',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: dueDate || null,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put('/:id', validateUpdateTask, (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const updatedTask = { ...tasks[taskIndex], ...req.body };
  tasks[taskIndex] = updatedTask;
  res.status(200).json(updatedTask);
});

router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

router.patch('/:id/toggle', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  res.status(200).json(tasks[taskIndex]);
});
module.exports = router;
