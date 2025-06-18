import "./ItemModal.css";
import closeIcon from "../../assets/close-light.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";

function ItemModal({ activeModal, onClose, card, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card && currentUser && card.owner === currentUser.id;

  if (!card) return null;

  return activeModal === "preview" ? (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_type_image">
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <div className="modal__image-wrapper">
          <img
            src={card.imageUrl}
            alt={card.name || "Weather wear"}
            className="modal__image"
            style={{ background: "#eaeaea" }}
          />
        </div>
        <div className="modal__footer">
          <div className="modal__footer-row">
            <h2 className="modal__caption">{card.name}</h2>
            {isOwner && (
              <button
                className="modal__delete-button"
                onClick={() => onDeleteItem(card)}
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
