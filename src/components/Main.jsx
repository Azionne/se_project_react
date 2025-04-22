import { useContext } from "react";
import "../blocks/Main.css";
import Weathercard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Itemcard.css";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems = [] }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <Weathercard weatherData={weatherData} />
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
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
