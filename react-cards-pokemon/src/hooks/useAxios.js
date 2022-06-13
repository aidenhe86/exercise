import { useState } from "react";
import uuid from "uuid";
import axios from "axios";

/* Renders a single playing card. */
function useAxios(url) {
  const [cards, setCards] = useState([]);
  const addCard = async (restOfUrl = "") => {
    const response = await axios.get(`${url}${restOfUrl}/`);
    setCards((cards) => [...cards, { ...response.data, id: uuid() }]);
  };
  return [cards, addCard];
}

export default useAxios;
