import React, { useState, useEffect } from "react";
import "../RegisterModalForm/RegisterModalForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModalForm.css";

function LoginModalForm({
  onClose,
  activeModal,
  onLogin,
  isSaving,
  setActiveModal,
  loginError,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

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

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email.trim());
    const isPasswordValid = password.trim() !== "";
    setIsFormValid(isEmailValid && isPasswordValid);
  }, [email, password]);

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
        <span>
          <span style={{ color: "black" }}>Log In</span>
          {loginError && (
            <span style={{ color: "red" }}> &nbsp;{loginError}</span>
          )}
        </span>
      }
      buttonText={isSaving ? "Logging In..." : "Log In"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          required
          type="email"
          className={`modal__input modal__input_type_email${
            loginError ? " modal_error" : ""
          }`}
          id="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {loginError && <span className="modal__error">{loginError}</span>}
    </ModalWithForm>
  );
}

export default LoginModalForm;
