import React from "react";
import { Link } from "react-router-dom";

function Soda() {
  return (
    <div>
      <h1>SODA!</h1>
      <img
        src="https://media0.giphy.com/media/v2YxCO2pwHjji/giphy.gif?cid=ecf05e47t7t8c7jpoklpaf3ikoi25mufjx6hsgiqsub2kvva&rid=giphy.gif&ct=g"
        alt="Coke Cola"
      />
      <div>
        <Link exact="true" to="/">
          Home
        </Link>
      </div>
    </div>
  );
}

export default Soda;
