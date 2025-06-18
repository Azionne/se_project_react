import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import PropTypes from "prop-types";

export default function ClothesSection({
  handleCardLike,
  handleAddClick,
  handleCardClick,
  clothingItems,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Filter items to only those owned by the current user
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?.id || item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__description">
        <p className="clothes-section__label">Your items</p>
        <button
          className="clothes-section__add-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id || item.id}
            item={item}
            handleCardClick={handleCardClick}
            handleCardLike={handleCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

ClothesSection.propTypes = {
  clothingItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAddClick: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handleCardLike: PropTypes.func.isRequired,
};
