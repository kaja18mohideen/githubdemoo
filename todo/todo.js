import React, { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ name: "", description: "", status: "Not Completed" });
  const [filterStatus, setFilterStatus] = useState("All");

  const addTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo({ name: "", description: "", status: "Not Completed" });
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const updateTodo = (index, updatedTodo) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    setTodos(updatedTodos);
  };

  const toggleStatus = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].status =
      updatedTodos[index].status === "Not Completed" ? "Completed" : "Not Completed";
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterStatus === "All") return true;
    return todo.status === filterStatus;
  });

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Task Name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div>
        <label>Filter Status:</label>
        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>
      {filteredTodos.map((todo, index) => (
        <div key={index}>
          <div>
            <h3>{todo.name}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.status}</p>
            <button onClick={() => toggleStatus(index)}>Toggle Status</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </div>
          <div>
            <button
              onClick={() => {
                const updatedTodo = prompt("Update Todo:", todo.name);
                if (updatedTodo !== null) {
                  updateTodo(index, { ...todo, name: updatedTodo });
                }
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
