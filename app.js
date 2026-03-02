let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const count = document.getElementById("taskCount");

  list.innerHTML = "";

  tasks.forEach((task, index) => {
    list.innerHTML += `
      <li class="${task.completed ? 'completed' : ''}">
        <span onclick="toggleComplete(${index})">${task.text}</span>
        <button onclick="deleteTask(${index})">❌</button>
      </li>
    `;
  });

  count.textContent = `Total Tasks: ${tasks.length}`;
}

function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value.trim() !== "") {
    tasks.push({ text: input.value, completed: false });
    saveTasks();
    input.value = "";
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function clearAll() {
  tasks = [];
  saveTasks();
  renderTasks();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

function updateOnlineStatus() {
  const status = document.getElementById("status");
  status.textContent = navigator.onLine
    ? "🟢 You are Online"
    : "🔴 You are Offline (Still Working)";
}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
updateOnlineStatus();

renderTasks();

/* Service Worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}