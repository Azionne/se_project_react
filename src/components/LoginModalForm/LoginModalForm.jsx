import React, { useState, useEffect } from "react";
import "../RegisterModalForm/RegisterModalForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModalForm.css";

export default function LoginModalForm({
  onClose,
  activeModal,
  onLogin,
  isSaving,
  setActiveModal,
  switchToSignUp,
  loginError, // Add this prop
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  // Remove local loginError state since we're using the prop

  const isOpen = activeModal === "login";

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onLogin({ email, password });
    }
  };

  // Validation helpers
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const minPasswordLength = 6;
  const emailTouched = email.length > 0;
  const passwordTouched = password.length > 0;
  const emailInvalid = emailTouched && !emailRegex.test(email);
  const passwordInvalid =
    passwordTouched && password.length < minPasswordLength;

  useEffect(() => {
    setIsFormValid(!emailInvalid && !passwordInvalid);
  }, [emailInvalid, passwordInvalid]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

  return (
    <ModalWithForm
      title={
        <span className="login-modal__title">
          <span className="login-modal__title-text">Log In</span>
          {loginError && (
            <span className="login-modal__title-error">{loginError}</span>
          )}
        </span>
      }
      buttonText={isSaving ? "Logging In..." : "Log In"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email <span className="modal__required-asterisk">*</span>
        <input
          required
          type="email"
          className={`modal__input modal__input_type_email${
            loginError ? " modal_error" : ""
          }`}
          id="login-email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        {emailTouched && emailInvalid && (
          <span className="modal__required-message">
            Please enter a valid email address
          </span>
        )}
      </label>

      <label className="modal__label">
        Password <span className="modal__required-asterisk">*</span>
        <input
          required
          type="password"
          className="modal__input"
          id="login-password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {passwordTouched && passwordInvalid && (
          <span className="modal__required-message">
            Password must be at least {minPasswordLength} characters
          </span>
        )}
      </label>
      {loginError && <span className="login-form__error">{loginError}</span>}

      <button
        type="submit"
        className="login-modal__submit"
        disabled={!email || !password}
      >
        Log In
      </button>
      <a
        href="#"
        className="login-modal__signup-link"
        onClick={(e) => {
          e.preventDefault();
          switchToSignUp(); // This will open the Register modal
        }}
      >
        or Sign Up
      </a>
    </ModalWithForm>
  );
}
