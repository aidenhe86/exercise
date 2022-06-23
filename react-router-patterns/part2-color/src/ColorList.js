import React from "react";
import { Link, Outlet } from "react-router-dom";

function ColorList({ colors }) {
  const colorLinks = Object.keys(colors).map((name) => (
    <li key={name}>
      <Link to={`/colors/${name}`}>{name}</Link>
    </li>
  ));

  return (
    <div className="ColorList">
      <h2>Welcome to color page!</h2>
      <h1>
        <Link exact="true" to="/colors/new">
          Add a new Color!
        </Link>
      </h1>
      <div>
        <p>Please choose a color</p>
        <ul>{colorLinks}</ul>
      </div>
      <Outlet />
    </div>
  );
}

export default ColorList;
