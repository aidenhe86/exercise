import React, { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const addTodo = (newTodo) => {
    setTodos((todos) => [...todos, newTodo]);
  };
  const removeTodo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };
  return (
    <div className="TodoList">
      <h1>Todo List</h1>
      <NewTodoForm addTodo={addTodo} />
      {todos.map((todo) => (
        <Todo
          handleRemove={removeTodo}
          task={todo.task}
          id={todo.id}
          key={todo.id}
        />
      ))}
    </div>
  );
};

export default TodoList;
