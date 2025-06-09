import "./ModalWithForm.css";
import closeIcon from "../../assets/close.png";
function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={onClose} // <-- overlay click closes modal
    >
      <div
        className="modal__content-form"
        onClick={(e) => e.stopPropagation()} // <-- prevent close when clicking inside modal
      >
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="close icon"></img>
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
