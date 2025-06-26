import "./DeleteItemModal.css";
import closeIcon from "../../assets/close-light.png";

function DeleteItemModal({
  activeModal,
  onConfirm,
  onClose,
  isOpen,
  onSubmit,
  onDelete,
}) {
  const handleOnConfirmDelete = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <div className={`modal ${isOpen && "modal_opened"}`} onClick={onClose}>
      <div
        className="delete-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="delete-modal__text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
          <br />
        </h2>
        <button onClick={onClose} className="modal__close" type="button">
          <img
            className="delete-modal__close-icon"
            src={closeIcon}
            alt="close"
          />
        </button>
        <form className="modal__form">
          <button
            className="delete-modal__submit"
            type="submit"
            onClick={handleOnConfirmDelete}
          >
            Yes, delete item
          </button>
          <button className="cancel__submit" type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteItemModal;
