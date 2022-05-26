import React from "react";
import "./Pokecard.css";

const Poke_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const Pokecard = (props) => {
  const img = Poke_URL + props.id + ".png";
  return (
    <div className="Pokecard">
      <div className="Pokecard-name">{props.name}</div>
      <img className="Pokecard-img" src={img}></img>
      <div className="Pokecard-type">Type: {props.type}</div>
      <div className="Pokecard-exp">EXP: {props.exp}</div>
    </div>
  );
};
export default Pokecard;
