import React from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import PropTypes from "prop-types";
import CurrentUserContext from "../../context/CurrentUserContext";

export default function EditProfileModal({
  onClose,
  activeModal,
  onEditProfile,
  isSaving,
}) {
  //const[isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (activeModal === "edit-profile" && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [activeModal, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText={isSaving ? "Saving..." : "Save"}
      activeModal={activeModal}
      modalName="edit-profile"
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={true}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          value={avatar}
          onChange={(e) => {
            setAvatar(e.target.value);
          }}
          required
        />
      </label>
    </ModalWithForm>
  );
}
EditProfileModal.propTypes = {
  onClose: PropTypes.func.isRequired, // <-- update here
  activeModal: PropTypes.string.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
};
