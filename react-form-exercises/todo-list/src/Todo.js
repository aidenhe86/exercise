import React from "react";

// Single Todo
function Todo({ task, id, handleRemove }) {
  const remove = () => handleRemove(id);
  return (
    <div className="Todo">
      {task}
      <button onClick={remove}>X</button>
    </div>
  );
}

export default Todo;
