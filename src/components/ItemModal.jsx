import "../blocks/ItemModal.css";

function ItemModal({ activeModal, onCLose, card }) {
  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal__opened" : ""}`}
    >
      <div className="modal__content__content_type_image">
        <button onClick={onCLose} type="button" className="modal__close">
          CLOSE
        </button>
        <img src={card.link} alt="" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
