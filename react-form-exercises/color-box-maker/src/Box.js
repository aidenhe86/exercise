import React from "react";

// Single Box
function Box(props) {
  const remove = () => props.handleRemove(props.id);
  return (
    <div
      className="Box"
      style={{
        backgroundColor: props.backgroundColor,
        width: `${props.width}em`,
        height: `${props.height}em`,
      }}
    >
      <button onClick={remove}>X</button>
    </div>
  );
}

export default Box;
