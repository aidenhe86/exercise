import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

const BoxList = () => {
  const INITIAL_STATE = [
    { id: uuid(), backgroundColor: "red", width: 10, height: 10 },
    { id: uuid(), backgroundColor: "blue", width: 7, height: 8 },
    { id: uuid(), backgroundColor: "yellow", width: 10, height: 8 },
  ];
  const [boxes, setBoxes] = useState(INITIAL_STATE);
  const addBox = (newBox) => {
    setBoxes((boxes) => [...boxes, { ...newBox, id: uuid() }]);
  };
  const removeBox = (id) => {
    setBoxes((boxes) => boxes.filter((box) => box.id !== id));
  };

  return (
    <div>
      <NewBoxForm addBox={addBox} />
      {boxes.map((box) => (
        <Box
          key={box.id}
          id={box.id}
          backgroundColor={box.backgroundColor}
          width={box.width}
          height={box.height}
          handleRemove={removeBox}
        />
      ))}
    </div>
  );
};

export default BoxList;
