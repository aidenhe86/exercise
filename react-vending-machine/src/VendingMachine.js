import React from "react";
import { Link } from "react-router-dom";
import "./VendingMachine.css";

function VendingMachine() {
  return (
    <div className="VendingMachine">
      <h1>This is Vending Machine. What would you like?</h1>
      <div className="VendingMachine-link">
        <Link exact="true" to="/soda">
          Soda
        </Link>
        <Link exact="true" to="/chips">
          Chips
        </Link>
        <Link exact="true" to="/candy">
          Candy
        </Link>
      </div>
    </div>
  );
}

export default VendingMachine;
