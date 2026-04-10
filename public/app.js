document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const loadingDiv = document.getElementById('loading');
  const errorDiv = document.getElementById('error');

  const API_URL = '/tasks';

  // State
  let tasks = [];

  // Helper to show errors
  const showError = (msg) => {
    errorDiv.textContent = msg;
    errorDiv.classList.remove('hidden');
    setTimeout(() => errorDiv.classList.add('hidden'), 3000);
  };

  const showLoading = (show) => {
    if (show) {
      loadingDiv.classList.remove('hidden');
    } else {
      loadingDiv.classList.add('hidden');
    }
  };

  // Render tasks natively
  const renderTasks = () => {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
      const emptyMsg = document.createElement('li');
      emptyMsg.textContent = 'No tasks found. Add a new one above!';
      emptyMsg.style.justifyContent = 'center';
      emptyMsg.style.color = 'var(--coffee-text)';
      emptyMsg.style.fontStyle = 'italic';
      taskList.appendChild(emptyMsg);
      return;
    }

    tasks.forEach(task => {
      const li = document.createElement('li');
      if (task.completed) {
        li.classList.add('completed');
      }

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => toggleTask(task.id, checkbox.checked));

      const span = document.createElement('span');
      span.className = 'task-title';
      span.textContent = task.title;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => deleteTask(task.id));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);

      taskList.appendChild(li);
    });
  };

  // 1. Fetch all tasks from backend (GET /tasks)
  const fetchTasks = async () => {
    showLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      
      // Update local render state only from API
      tasks = data;
      renderTasks();
    } catch (err) {
      showError(err.message);
    } finally {
      showLoading(false);
    }
  };

  // 2. Add a new task
  const addTask = async (title) => {
    showLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      if (!response.ok) throw new Error('Failed to add task');
      
      // Refresh list directly from backend instead of tasks.push()
      await fetchTasks();
      taskInput.value = '';
    } catch (err) {
      showError(err.message);
    } finally {
      showLoading(false);
    }
  };

  // 3. Mark Task Complete
  const toggleTask = async (id, completed) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
      });
      if (!response.ok) throw new Error('Failed to update task');
      
      // Refresh list directly from backend
      await fetchTasks();
    } catch (err) {
      showError(err.message);
    }
  };

  // 4. Delete Task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete task');
      
      // Refresh list directly from backend
      await fetchTasks();
    } catch (err) {
      showError(err.message);
    }
  };

  // Form submission handling
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (title) {
      addTask(title);
    }
  });

  // Initial fetch on page load
  fetchTasks();
});
