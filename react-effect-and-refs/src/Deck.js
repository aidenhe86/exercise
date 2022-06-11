import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import axios from "axios";

const BASE_URL = "http://deckofcardsapi.com/api/deck";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState(null);
  const [autoDraw, setAutoDraw] = useState(false);
  const timer = useRef(null);

  //   draw from a new deck
  useEffect(() => {
    async function getNewDeck() {
      const res = await axios.get(`${BASE_URL}/new/shuffle/`);
      setDeck(res.data.deck_id);
    }
    getNewDeck();
  }, []);

  // // draw card every click
  // async function drawCard() {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/${deck}/draw/`);
  //     if (res.data.remaining === 0) {
  //       throw new Error("No Card remaining!");
  //     }
  //     setCards(res.data.cards[0].image);
  //   } catch (err) {
  //     alert(err);
  //   }
  // }

  // draw one card per second
  useEffect(() => {
    // function to draw card
    async function drawCard() {
      try {
        const res = await axios.get(`${BASE_URL}/${deck}/draw/`);

        // alert error if deck remaining is 0
        if (res.data.remaining === 0) {
          setAutoDraw(false);
          throw new Error("No Card remaining!");
        }

        setCards(res.data.cards[0].image);
      } catch (err) {
        alert(err);
      }
    }

    // auto draw card per sec
    if (autoDraw && !timer.current) {
      timer.current = setInterval(async () => {
        await drawCard();
      }, 1000);
    }

    // clear interval
    return () => {
      clearInterval(timer.current);
      timer.current = null;
    };
  }, [autoDraw, deck]);

  const toggleAutoDraw = () => {
    setAutoDraw((auto) => !auto);
  };

  return (
    <div>
      <button onClick={toggleAutoDraw}>
        {autoDraw ? "STOP" : "Start"} Draw a New Card!
      </button>
      <Card image={cards} />
    </div>
  );
};

export default Deck;
