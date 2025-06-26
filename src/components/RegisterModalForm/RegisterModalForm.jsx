import React, { useState, useEffect } from "react";
import "./RegisterModalForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModalForm(props) {
  const { onClose, activeModal, isSaving, onRegister, switchToLogin } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  const isOpen = activeModal === "sign-up";

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
    if (activeModal === "sign-up") {
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

  // Validation helpers
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const minPasswordLength = 6;
  const emailTouched = email.length > 0;
  const passwordTouched = password.length > 0;
  const emailInvalid = emailTouched && !emailRegex.test(email);
  const passwordInvalid =
    passwordTouched && password.length < minPasswordLength;

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
      activeModal={activeModal}
      modalName="sign-up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      contentClassName="register-modal__content"
      formClassName="register-modal__form"
    >
      <label className="modal__label">
        Email <span style={{ color: "red" }}>*</span>
        <input
          required
          type="email"
          className="modal__input"
          id="register-email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={email}
        />
        {emailTouched && emailInvalid && (
          <span className="modal__required-message">
            Please enter a valid email address
          </span>
        )}
      </label>
      <label className="modal__label">
        Password <span style={{ color: "red" }}>*</span>
        <input
          required
          type="password"
          className="modal__input"
          id="register-password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={password}
        />
        {passwordTouched && passwordInvalid && (
          <span className="modal__required-message">
            Password must be at least {minPasswordLength} characters
          </span>
        )}
      </label>
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="register-name"
          name="name"
          placeholder="Name (optional)"
          onChange={handleChange}
          value={name}
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="register-avatar"
          name="avatar"
          placeholder="Avatar URL (optional)"
          onChange={handleChange}
          value={avatar}
        />
      </label>
      {/* Add buttons at the bottom in reverse order: Sign Up | or Log In */}
      <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
        <button
          type="submit"
          className="register-modal__submit"
          disabled={!isFormValid || isSaving}
        >
          Sign Up
        </button>
        <a
          href="#"
          className="register-modal__login-link"
          onClick={(e) => {
            e.preventDefault();
            switchToLogin();
          }}
        >
          Or Log In
        </a>
      </div>
    </ModalWithForm>
  );
}
