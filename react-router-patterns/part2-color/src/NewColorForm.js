import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewColorForm({ addColor }) {
  const [formData, setFormData] = useState({ name: "", hex: "#ffffff" });
  const { name, hex } = formData;
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addColor({ [name]: hex });
    navigate("/colors");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Color Name</label>
      <input
        onChange={handleChange}
        name="name"
        id="name"
        value={name}
        placeholder="Color Name"
      />
      <label htmlFor="hex">Color value</label>
      <input
        onChange={handleChange}
        name="hex"
        id="hex"
        value={hex}
        type="color"
      />
      <button>Submit this color!</button>
    </form>
  );
}

export default NewColorForm;
