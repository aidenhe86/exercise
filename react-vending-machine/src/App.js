import React from "react";
import VendingMachine from "./VendingMachine";
import Soda from "./Soda";
import Candy from "./Candy";
import Chips from "./Chips";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VendingMachine />}></Route>
          <Route path="soda" element={<Soda />} />
          <Route path="candy" element={<Candy />} />
          <Route path="chips" element={<Chips />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
