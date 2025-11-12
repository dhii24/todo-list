const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

window.onload = loadTasks;

// Add task
addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task) {
    addTask(task);
    saveTask(task);
    taskInput.value = "";
  }
});

// Create task element
function addTask(taskText, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");
  
  li.textContent = taskText;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("delete-btn");
  delBtn.addEventListener("click", () => {
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText) {
  const tasks = getTasksFromStorage();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach(task => addTask(task.text, task.completed));
}

// Get tasks array
function getTasksFromStorage() {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : [];
}

// Update localStorage after changes
function updateLocalStorage() {
  const updatedTasks = [];
  const items = taskList.querySelectorAll("li");
  items.forEach(li => {
    const taskText = li.firstChild.textContent;
    const isDone = li.classList.contains("completed");
    updatedTasks.push({ text: taskText, completed: isDone });
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
