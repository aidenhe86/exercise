import React from "react";
import { Link, Outlet } from "react-router-dom";

function DogList({ dogs }) {
  return (
    <div className="DogList">
      <div className="row mt-4">
        <div className="col">
          <h1 className="text-center">
            Here are dogs! Click dog's name for more info!
          </h1>
        </div>
      </div>
      <div className="row">
        {dogs.map((d) => (
          <div className="col-3 text-center" key={d.name}>
            <img src={d.src} alt={d.name} />
            <h3 className="mt-3">
              <Link to={`/dogs/${d.name.toLowerCase()}`}>{d.name}</Link>
            </h3>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default DogList;
