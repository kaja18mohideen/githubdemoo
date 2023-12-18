// Script for dynamic rendering and interactions
let todos = [];
let newTodo = { name: "", description: "", status: "Not Completed" };
let filterStatus = "All";

function addTodo() {
  newTodo.name = document.getElementById("taskName").value;
  newTodo.description = document.getElementById("taskDescription").value;
  todos.push({ ...newTodo });
  newTodo = { name: "", description: "", status: "Not Completed" };
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function updateTodoStatus(index) {
  todos[index].status =
    todos[index].status === "Not Completed" ? "Completed" : "Not Completed";
  renderTodos();
}

function updateTodoName(index) {
  const updatedTodoName = prompt("Update Todo:", todos[index].name);
  if (updatedTodoName !== null) {
    todos[index].name = updatedTodoName;
    renderTodos();
  }
}

function setFilterStatus() {
  filterStatus = document.getElementById("filterStatus").value;
  renderTodos();
}

function renderTodos() {
  const todosContainer = document.getElementById("todos");
  todosContainer.innerHTML = "";

  todos.filter(todo => {
    if (filterStatus === "All" || todo.status === filterStatus) {
      const todoCard = document.createElement("div");
      todoCard.className = `todo-card ${todo.status.toLowerCase().replace(' ', '-')}`;

      const todoInfo = document.createElement("div");
      const todoActions = document.createElement("div");

      const taskName = document.createElement("h3");
      taskName.textContent = todo.name;

      const taskDescription = document.createElement("p");
      taskDescription.textContent = todo.description;

      const status = document.createElement("p");
      status.textContent = `Status: ${todo.status}`;

      const toggleStatusButton = document.createElement("button");
      toggleStatusButton.textContent = "Toggle Status";
      toggleStatusButton.onclick = () => updateTodoStatus(todos.indexOf(todo));

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteTodo(todos.indexOf(todo));

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = () => updateTodoName(todos.indexOf(todo));

      todoInfo.appendChild(taskName);
      todoInfo.appendChild(taskDescription);
      todoInfo.appendChild(status);

      todoActions.appendChild(toggleStatusButton);
      todoActions.appendChild(deleteButton);
      todoActions.appendChild(editButton);

      todoCard.appendChild(todoInfo);
      todoCard.appendChild(todoActions);

      todosContainer.appendChild(todoCard);
    }
  });
}

// Initial render
renderTodos();
