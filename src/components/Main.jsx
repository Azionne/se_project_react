import "../blocks/Main.css";
import Weathercard from "./Weathercard";
import { defaultClothingItems } from "../utils/constants";
import ItemCard from "./ItemCard";
import "../blocks/Itemcard.css"; // Correctly import the CSS file

function Main({ weatherData, handleCardClick }) {
  return (
    <main>
      <Weathercard />
      <section className="cards">
        <p className="cards__text">
          Today is 75 &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            // .filter((item) => {
            // return item.weather === weatherData.type;
            //})
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
