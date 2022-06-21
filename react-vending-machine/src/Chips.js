import React from "react";
import { Link } from "react-router-dom";

function Chips() {
  return (
    <div>
      <h1>Chips!</h1>
      <img
        src="https://media0.giphy.com/media/EFUiKHUiZNQUo/giphy.gif?cid=ecf05e475jkqy91rul9uj2l68ftqz6mro8fldnhnbzuvhpfj&rid=giphy.gif&ct=g"
        alt="chips"
      />
      <div>
        <Link exact="true" to="/">
          Home
        </Link>
      </div>
    </div>
  );
}

export default Chips;
