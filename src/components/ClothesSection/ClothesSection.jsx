import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ handleAddClick, onCardClick, clothingItems }) {
  console.log(
    "ClothesSection component rendered with clothingItems:",
    clothingItems
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__description">
        <p className="clothes-section__label">Your Items</p>
        <button className="clothes-section__btn" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="cards__list">
        {clothingItems.map((item, index) => {
          return (
            <ItemCard
              key={item._id || index}
              item={item}
              onCardClick={onCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
