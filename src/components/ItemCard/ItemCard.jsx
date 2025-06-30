import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeClear from "../../assets/like-clear.svg";
import liked from "../../assets/liked.svg";

export default function ItemCard({ item, handleCardClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const likes = Array.isArray(item.likes) ? item.likes : [];

  // Use either _id or id field from currentUser (Express backend uses 'id')
  const userId = currentUser?._id || currentUser?.id;

  const isLiked =
    currentUser && Array.isArray(item.likes) && item.likes.includes(userId);

  function handleLike(e) {
    e.stopPropagation();

    // Only allow liking if user is logged in
    if (!currentUser) {
      return;
    }

    if (typeof handleCardLike === "function") {
      // Use either _id or id field, whichever exists
      const itemId = item._id || item.id;
      handleCardLike({ _id: itemId, isLiked });
    } else {
      console.error("handleCardLike is not a function");
    }
  }

  return (
    <li className="item-card">
      <img
        onClick={() => handleCardClick(item)}
        className="item-card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
      <div className="item-card__content">
        <span className="item-card__name">{item.name}</span>
        {currentUser && (
          <button
            className={`item-card__like-btn${
              isLiked ? " item-card__like-btn_active" : ""
            }`}
            onClick={handleLike}
            aria-label={isLiked ? "Unlike" : "Like"}
            type="button"
          >
            <img
              src={isLiked ? liked : likeClear}
              alt={isLiked ? "Liked" : "Not liked"}
              className="item-card__heart"
            />
          </button>
        )}
      </div>
    </li>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handleCardLike: PropTypes.func,
};
