import { defaultClothingItems } from "../utils/constants";

import ItemCard from "../components/ItemCard";

import "../blocks/ClothesSection.css";

function ClothesSection({ onCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__description">
        <p className="clothes-section__label">Your Items</p>
        <button className="clothes-section__btn">+ Add New</button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
