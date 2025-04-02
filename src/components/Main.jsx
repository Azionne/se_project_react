import "../blocks/Main.css";
import Weathercard from "./Weathercard";
import { defaultClothingItems } from "../utils/constants";
import ItemCard from "./ItemCard";
import "../blocks/Itemcard.css";

function Main({ weatherData, handleCardClick }) {
  return (
    <main>
      <Weathercard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F} &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => item.weather === weatherData.type)
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
