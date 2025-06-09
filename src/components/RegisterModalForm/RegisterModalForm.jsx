import React, { useState, useEffect } from "react";
import "./RegisterModalForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModalForm({
  onClose, // <-- use onClose, not closeActiveModal
  activeModal,
  registerError,
  setActiveModal,
  isSaving,
  onRegister, // <-- use onRegister, not handleRegisterClick
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  const isOpen = activeModal === "register";

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

  useEffect(() => {
    if (activeModal === "register") {
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
    }
  }, [activeModal]);

  function handleChange(e) {
    const { name, value, validationMessage } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "name":
        setName(value);
        break;
      case "avatar":
        setAvatar(value);
        break;
      default:
        break;
    }

    // Update error messages
    setErrors((prev) => ({
      ...prev,
      [name]: validationMessage,
    }));
  }

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error);
    const requiredFields = email.trim() !== "" && password.trim() !== "";
    setIsFormValid(!hasErrors && requiredFields);
  }, [email, password, name, avatar, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    if (name.trim()) {
      payload.name = name;
    }
    if (avatar.trim()) {
      payload.avatar = avatar;
    }

    if (isFormValid) {
      onRegister(payload);
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={isSaving ? "Registering..." : "Sign Up"}
      isOpen={isOpen}
      onClose={onClose} // <-- fix here
      onSubmit={handleSubmit} // <-- fix here
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          required
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={email}
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          required
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={password}
        />
      </label>

      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          required
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={name}
        />
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar{" "}
        <input
          required
          type="url"
          className="modal__input"
          id="avatar"
          name="avatar"
          placeholder="Avatar Url"
          onChange={handleChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModalForm;
