import React, { useContext } from "react";
import "../Main/Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main(props) {
  const {
    weatherData,
    handleCardClick,
    clothingItems,
    handleCardLike,
    handleCardDelete,
  } = props;
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  console.log("Main props:", props);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}{" "}
          &deg; {currentTemperatureUnit} / You may want to wear:
        </p>

        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item, idx) => (
              <ItemCard
                key={item.id || idx}
                item={item}
                handleCardClick={handleCardClick}
                handleCardLike={handleCardLike}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
