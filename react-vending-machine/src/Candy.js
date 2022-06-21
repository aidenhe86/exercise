import React from "react";
import { Link } from "react-router-dom";

function Candy() {
  return (
    <div>
      <h1>Candy!</h1>
      <img
        src="https://media0.giphy.com/media/eb38JSQTzvEsD9FzLG/giphy.gif?cid=ecf05e474y0ynpw1hkjqkmqeg8efc7de5d6ocdkj5vr0c7pz&rid=giphy.gif&ct=g"
        alt="candy"
      />
      <div>
        <Link exact="true" to="/">
          Home
        </Link>
      </div>
    </div>
  );
}

export default Candy;
