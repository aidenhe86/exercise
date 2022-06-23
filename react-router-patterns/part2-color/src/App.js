import React from "react";
import ColorRoute from "./ColorRoute";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ColorRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
