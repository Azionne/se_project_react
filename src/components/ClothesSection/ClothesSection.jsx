import { defaultClothingItems } from "../../utils/constants";

import ItemCard from "../ItemCard/ItemCard";

import "./ClothesSection.css";

function ClothesSection({ onCardClick, handleActiveModal, clothingItems }) {
  // Removed misplaced onClick function
  console.log(
    "ClothesSection component rendered with clothingItems:",
    clothingItems
  );
  return (
    <div className="clothes-section">
      <div className="clothes-section__description">
        <p className="clothes-section__label">Your Items</p>
        <button className="clothes-section__btn" onCardClick={onCardClick}>
          + Add New
        </button>
      </div>
      <ul className="cards__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
