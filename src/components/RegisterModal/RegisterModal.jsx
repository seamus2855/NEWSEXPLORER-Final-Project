import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/UseFormAndValidation"; // Leverage validation states
import "./RegisterModal.css";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  handleAltClick,
  serverError,
  isRegistrationSuccess,
  onSignInLinkClick,
  isLoading,
}) {
  // Use structured values, errors, and validation states
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  // Reset inputs when modal opens or closes
  useEffect(() => {
    if (isOpen) {
       
      resetForm({ email: "", password: "", username: "" });
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onRegister({
        email: values.email,
        password: values.password,
        name: values.username,
      });
    }
  };

  // High-Fidelity Success Modal View Context
  if (isRegistrationSuccess) {
    return (
      <div 
        className={`modal modal_opened`} 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="success-title"
      >
        <div className="modal__container register-modal__success-card">
          <button 
            type="button" 
            className="modal__close-button" 
            onClick={onClose} 
            aria-label="Close success overlay" 
          />
          <h2 id="success-title" className="register-modal__success-title">
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
    );
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Signing up..." : "Sign up"}
      altButtonText="Sign in"
      onAltButtonClick={handleAltClick}
      isValid={isValid}
    >
      {/* Email input field */}
      <div className="modal__label-container">
        <label className="modal__label" htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          name="email"
          className={`modal__input ${errors.email ? "modal__input_type_error" : ""}`}
          placeholder="Enter email"
          required
          value={values.email || ""}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "register-email-error" : undefined}
        />
        <span 
          id="register-email-error" 
          className={`modal__error-message ${errors.email ? "modal__error-message_visible" : ""}`}
        >
          {errors.email}
        </span>
      </div>

      {/* Password input field */}
      <div className="modal__label-container">
        <label className="modal__label" htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          name="password"
          className={`modal__input ${errors.password ? "modal__input_type_error" : ""}`}
          placeholder="Enter password"
          required
          minLength="4"
          value={values.password || ""}
          onChange={handleChange}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "register-password-error" : undefined}
        />
        <span 
          id="register-password-error" 
          className={`modal__error-message ${errors.password ? "modal__error-message_visible" : ""}`}
        >
          {errors.password}
        </span>
      </div>

      {/* Username input field */}
      <div className="modal__label-container">
        <label className="modal__label" htmlFor="register-username">Username</label>
        <input
          id="register-username"
          type="text"
          name="username"
          className={`modal__input ${errors.username ? "modal__input_type_error" : ""}`}
          placeholder="Enter your username"
          required
          minLength="2"
          maxLength="30"
          value={values.username || ""}
          onChange={handleChange}
          aria-invalid={!!errors.username}
          aria-describedby={errors.username ? "register-username-error" : undefined}
        />
        <span 
          id="register-username-error" 
          className={`modal__error-message ${errors.username ? "modal__error-message_visible" : ""}`}
        >
          {errors.username}
        </span>
      </div>

      {/* Shared Server Fallback Exception Messaging */}
      {serverError && (
        <span className="register-modal__form-error" role="alert">{serverError}</span>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;
