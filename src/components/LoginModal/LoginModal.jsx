import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({
  isOpen,
  onClose,
  handleAltClick, // Renamed to match alternative link actions across modals
  onLogin,        // Explicit form submission handler
  isLoading,
  serverError,    // Included server fallback messaging
}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  // Reset inputs and validation metrics when modal visibility changes
  useEffect(() => {
    if (isOpen) {
      resetForm({ email: "", password: "" });
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onLogin({
        email: values.email,
        password: values.password,
      });
    }
  };

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Logging in..." : "Log in"}
      altButtonText="Sign up"
      onAltButtonClick={handleAltClick}
      isValid={isValid}
    >
      {/* Email input field */}
      <div className="modal__label-container">
        <label className="modal__label" htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          name="email"
          className={`modal__input ${errors.email ? "modal__input_type_error" : ""}`}
          placeholder="Enter email"
          required
          value={values.email || ""}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "login-email-error" : undefined}
        />
        <span 
          id="login-email-error" 
          className={`modal__error-message ${errors.email ? "modal__error-message_visible" : ""}`}
        >
          {errors.email}
        </span>
      </div>

      {/* Password input field */}
      <div className="modal__label-container">
        <label className="modal__label" htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          name="password"
          className={`modal__input ${errors.password ? "modal__input_type_error" : ""}`}
          placeholder="Enter password"
          required
          minLength="4"
          value={values.password || ""}
          onChange={handleChange}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "login-password-error" : undefined}
        />
        <span 
          id="login-password-error" 
          className={`modal__error-message ${errors.password ? "modal__error-message_visible" : ""}`}
        >
          {errors.password}
        </span>
      </div>

      {/* Shared Server Fallback Exception Messaging */}
      {serverError && (
        <span className="register-modal__form-error" role="alert">
          {serverError}
        </span>
      )}
    </ModalWithForm>
  );
}

export default LoginModal;
