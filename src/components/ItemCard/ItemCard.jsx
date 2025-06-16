import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeClear from "../../assets/like-clear.svg";
import liked from "../../assets/liked.svg";

export default function ItemCard({ item, handleCardClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const likes = Array.isArray(item.likes) ? item.likes : [];
  const isLiked =
    currentUser &&
    Array.isArray(item.likes) &&
    item.likes.includes(currentUser.id);

  function handleLike(e) {
    e.stopPropagation();
    if (typeof handleCardLike === "function") {
      handleCardLike({ id: item.id, isLiked });
    } else {
      console.error("handleCardLike is not a function");
    }
  }

  console.log(
    "likes:",
    item.likes,
    "currentUser.id:",
    currentUser.id,
    "typeof id:",
    typeof currentUser.id
  );

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
      </div>
    </li>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handleCardLike: PropTypes.func,
};
