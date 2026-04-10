const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// Serve the plain JS frontend locally
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage instead of a database
let tasks = [];

// GET /tasks - Return all tasks as JSON
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and cannot be empty.' });
  }

  const newTask = {
    id: Date.now().toString(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH /tasks/:id - Update task completion status
app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed status must be a boolean' });
  }

  tasks[taskIndex].completed = completed;
  res.json(tasks[taskIndex]);
});

// DELETE /tasks/:id - Delete the task by id
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json({ message: 'Task deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
