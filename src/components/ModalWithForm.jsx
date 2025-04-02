import "../blocks/ModalWithForm.css";
import closeIcon from "../assets/close.png";
function ModelWithForm({
  children,
  buttonText,
  title,
  activeModal,
  isOpen,
  onClose,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="close icon"></img>
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModelWithForm;
