import "./ModalWithForm.css";
import closeIcon from "../../assets/close.png";
function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  contentClassName = "",
}) {
  return (
    <div
      className={`modal${isOpen ? " modal_opened" : ""}${
        contentClassName ? " " + contentClassName : ""
      }`}
      onClick={onClose}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="close icon"></img>
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
