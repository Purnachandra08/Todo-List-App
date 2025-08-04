let tasks = [];

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('task-list');
const progressBar = document.getElementById('progress');
const progressText = document.getElementById('numbers');
const congrats = document.getElementById('congrats');

const updateProgress = () => {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const percent = total === 0 ? 0 : (completed / total) * 100;
  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${completed}/${total}`;

  if (total > 0 && completed === total) {
    congrats.classList.remove('hidden');
  } else {
    congrats.classList.add('hidden');
  }
};

const renderTasks = () => {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const item = document.createElement('li');
    item.className = 'task-item' + (task.completed ? ' completed' : '');

    item.innerHTML = `
      <span class="text">${task.text}</span>
      <div class="task-buttons">
        <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Done'}</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(item);
  });

  updateProgress();
};

const addTask = (text) => {
  tasks.push({ text, completed: false });
  renderTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  renderTasks();
};

const editTask = (index) => {
  const newText = prompt('Edit your task:', tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    renderTasks();
  }
};

const toggleTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
};

document.getElementById('taskForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    addTask(text);
    taskInput.value = '';
  }
});
