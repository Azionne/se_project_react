import "./ItemModal.css";
import closeIcon from "../../assets/close-light.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";

function ItemModal({ activeModal, onClose, card, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner =
    card &&
    currentUser &&
    (card.owner === currentUser._id || card.owner === currentUser.id);

  console.log("ItemModal - currentUser:", currentUser); // Debug log
  console.log("ItemModal - card:", card); // Debug log
  console.log("ItemModal - isOwner:", isOwner); // Debug log

  if (!card) return null;

  return activeModal === "preview" ? (
    <div className="modal modal_opened" onClick={onClose}>
      <div
        className="modal__content modal__content_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <div className="modal__image-wrapper">
          <img
            src={card.imageUrl}
            alt={card.name || "Weather wear"}
            className="modal__image"
          />
        </div>
        <div className="modal__footer">
          <div className="modal__footer-row">
            <h2 className="modal__caption">{card.name}</h2>
            {isOwner && (
              <button
                className="modal__delete-button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent modal from closing
                  onDeleteItem(card);
                }}
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  ) : null;
}

export default ItemModal;
