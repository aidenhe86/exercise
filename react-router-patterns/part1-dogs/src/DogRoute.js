import React from "react";
import DogList from "./DogList";
import DogDetails from "./DogDetails";
import { Route, Routes, Navigate } from "react-router-dom";

function DogRoute({ dogs }) {
  return (
    <Routes>
      <Route path="/dogs">
        {/* main page show all dog, index */}
        <Route index element={<DogList dogs={dogs} />} />

        {/* show 1 dog page, nested route with /dogs */}
        <Route path=":name" element={<DogDetails dogs={dogs} />} />
      </Route>

      {/* all not match route will navigate to /dogs page, * means all route that not match route above*/}
      <Route path="*" element={<Navigate replace to="/dogs" />} />
    </Routes>
  );
}

export default DogRoute;
