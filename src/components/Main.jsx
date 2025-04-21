import React from "react";
import "../blocks/Main.css";
import Weathercard from "./Weathercard";
//import { defaultClothingItems } from "../utils/constants";
import ItemCard from "./ItemCard";
import "../blocks/Itemcard.css";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems = [] }) {
  return (
    <main>
      <Weathercard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">Today is &deg; F / You may want to wear:</p>
        <ul className="cards__list">
          {Array.isArray(clothingItems) &&
            clothingItems
              .filter((item) => item.weather === weatherData.type)
              .map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
