import React, { useContext } from "react";
import "./ItemCard.css";
import PropTypes from "prop-types";
import CurrentUserContext from "../../context/CurrentUserContext";

export default function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const likes = Array.isArray(item.likes) ? item.likes : [];
  const isLiked = currentUser && likes.includes(currentUser._id);
  const cardLikeButton = `itemcard__like-button ${
    isLiked ? "itemcard__like-button_active" : ""
  }`;

  function handleLike(e) {
    e.stopPropagation(); // Prevent triggering onCardClick
    if (typeof onCardLike === "function") {
      onCardLike({ _id: item._id, isLiked });
    } else {
      console.error("onCardLike is not a function");
    }
  }

  return (
    <li className="itemcard__container">
      <div className="itemcard__header">
        <h2 className="itemcard__name">{item.name}</h2>
        {currentUser && currentUser._id && (
          <button
            className={cardLikeButton}
            type="button"
            onClick={handleLike}
            aria-label={isLiked ? "Unlike" : "Like"}
          ></button>
        )}
      </div>
      <img
        onClick={() => onCardClick(item)}
        className="itemcard__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
    </li>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func,
};
