import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";

function Colors({ colors }) {
  let name = useParams().color;
  let color = colors[name];
  if (color === undefined) return <Navigate to="/colors" />;
  return (
    <div className="Color" style={{ backgroundColor: color }}>
      <p>
        This is <b>{name}</b> Color!
      </p>
      <Link to="/">Return</Link>
    </div>
  );
}

export default Colors;
