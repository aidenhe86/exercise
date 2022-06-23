import React, { useState } from "react";
import ColorList from "./ColorList";
import Color from "./Color";
import NewColorForm from "./NewColorForm";
import { Route, Routes, Navigate } from "react-router-dom";

function ColorRoute() {
  const [colors, setColors] = useState({});
  const addColor = (newColor) => {
    setColors((colors) => ({ ...colors, ...newColor }));
  };
  console.log(colors);

  return (
    <Routes>
      <Route path="/colors">
        {/* main page index */}
        <Route index element={<ColorList colors={colors} />} />

        {/* show 1 item, nested route */}
        <Route path=":color" element={<Color colors={colors} />} />

        {/* add new item */}
        <Route path="new" element={<NewColorForm addColor={addColor} />} />
      </Route>

      {/* all not match route will navigate to index page, * means all route that not match route above*/}
      <Route path="*" element={<Navigate replace to="/colors" />} />
    </Routes>
  );
}

export default ColorRoute;
