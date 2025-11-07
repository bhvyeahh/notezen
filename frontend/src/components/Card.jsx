// src/components/Cards.jsx
import React from "react";
import { cardData } from "../data/cardData";
import "../styles/Card.css";
import Section from "./Section";

const Cards = () => {
  return (
    <Section>
    <div className="card-container">
{cardData.map((card, index) => (
    <div key={index} className="card">
    <img src={card.icon} alt={card.title} className="icon" />
    <h3>{card.title}</h3>
    <p>{card.description}</p>
  </div>
))}
    </div>
</Section>
  );
};

export default Cards;
