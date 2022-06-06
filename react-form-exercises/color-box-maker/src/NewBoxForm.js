import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const NewBoxForm = ({ addBox }) => {
  const INITIAL_STATE = {
    backgroundColor: "",
    width: "",
    height: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addBox({ ...formData, id: uuid() });
    setFormData(INITIAL_STATE);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="backgroundColor">Background Color</label>
      <input
        onChange={handleChange}
        type="text"
        name="backgroundColor"
        value={formData.backgroundColor}
        id="backgroundColor"
      />
      <label htmlFor="height">Height</label>
      <input
        onChange={handleChange}
        type="text"
        name="height"
        value={formData.height}
        id="height"
      />
      <label htmlFor="width">Width</label>
      <input
        onChange={handleChange}
        type="text"
        name="width"
        value={formData.width}
        id="width"
      />
      <button>Add a new box!</button>
    </form>
  );
};

export default NewBoxForm;
