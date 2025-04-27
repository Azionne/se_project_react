import "./ItemModal.css";
import closeIcon from "../../assets/close-light.png";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  console.log("Card passed to ItemModal:", card);
  if (!card) {
    return null; // Do not render the modal if card is null or undefined
  }

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>

        {console.log(card.imageUrl)}
        <img
          src={card.imageUrl}
          alt={card.name || "Weather wear"}
          className="modal__image"
        />
        <div className="modal__footer_container">
          <div className="modal__footer">
            <h2 className="modal__caption">{card.name}</h2>
            <div className="modal__delete-btn">
              <button className="modal__delete" onClick={() => onDelete(card)}>
                Delete Item
              </button>
            </div>

            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
