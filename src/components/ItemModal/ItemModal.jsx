import "./ItemModal.css";
import closeIcon from "../../assets/close-light.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";

function ItemModal({ activeModal, onClose, card, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card && currentUser && card.owner === currentUser.id;

  if (!card) return null;

  // Set the className for the delete button
  const itemDeleteButtonClassName = `modal__delete-button${
    isOwner ? "" : " modal__delete-button_hidden"
  }`;

  return activeModal === "preview" ? (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_type_image">
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>

        <img
          src={card.imageUrl}
          alt={card.name || "Weather wear"}
          className="modal__image"
        />
        <div className="modal__footer_container">
          <div className="modal__footer">
            <h2 className="modal__caption">{card.name}</h2>
            <div className="modal__delete-btn">
              {isOwner && (
                <button
                  className={itemDeleteButtonClassName}
                  onClick={() => onDeleteItem(card)}
                >
                  Delete
                </button>
              )}
            </div>

            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default ItemModal;
