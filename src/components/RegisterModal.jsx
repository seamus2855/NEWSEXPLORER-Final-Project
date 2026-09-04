import React, { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  handleAltClick,
  serverError,
  isRegistrationSuccess,
  onSignInLinkClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Clear component input data fields whenever the modal resets or opens
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password, name: username });
  };

  // Render a completely clean success window markup context variant if specified by parent loop state
  if (isRegistrationSuccess) {
    return (
      <div className={`modal modal_opened`}>
        <div className="modal__container">
          <button
            type="button"
            className="modal__close-button"
            onClick={onClose}
            aria-label="Close success overlay"
          />
          <div className="register-modal__success-container">
            <h2 className="register-modal__success-title">
              Registration successfully completed!
            </h2>
            <button
              type="button"
              className="register-modal__link"
              onClick={onSignInLinkClick}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Sign up"
      altButtonText="Sign in"
      onAltButtonClick={handleAltClick}
      isValid={email && password && username} // Bind validation tracking parameters here
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Enter email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="modal__error"></span>
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Enter password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="modal__error"></span>
      </label>

      <label className="modal__label">
        Username
        <input
          type="text"
          name="username"
          className="modal__input"
          placeholder="Enter your username"
          required
          minLength="2"
          maxLength="30"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <span className="modal__error"></span>
      </label>

      {/* Conditional rendering for remote backend validation exceptions (e.g., 'Email already exists') */}
      {serverError && (
        <span className="register-modal__form-error">{serverError}</span>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;
