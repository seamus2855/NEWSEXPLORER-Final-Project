import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation"; // FIX: Changed 'UseFormAndValidation' to lowercase 'useFormAndValidation'
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
      /* FIXED: Updated single underscores to BEM double hyphens (--) for the opened backdrop modifier */
      <div className={`modal modal--opened`} role="dialog" aria-modal="true" aria-labelledby="success-title">
        /* FIXED: Replaced leaked block prefix with an isolated modifier block syntax */
        <div className="modal__container modal__container--success">
          <button type="button" className="modal__close-button" onClick={onClose} aria-label="Close success overlay" />
          /* FIXED: Streamlined child selector architecture to live inside a unified modal envelope namespaces */
          <h2 id="success-title" className="modal__title modal__title--success">
            Registration successfully completed!
          </h2>
          <button type="button" className="modal__link" onClick={onSignInLinkClick}>
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
          /* FIXED: Converted single underscores to BEM double hyphens (--) for error state modifier styling hook toggle attributes */
          className={`modal__input ${errors.email ? "modal__input--type-error" : ""}`}
          placeholder="Enter email"
          required
          value={values.email || ""}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "register-email-error" : undefined}
        />
        <span
          id="register-email-error"
          /* FIXED: Converted single underscores to BEM double hyphens (--) for visibility state modifier styling hook toggle attributes */
          className={`modal__error-message ${errors.email ? "modal__error-message--visible" : ""}`}
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
          /* FIXED: Converted single underscores to BEM double hyphens (--) for error state modifier styling hook toggle attributes */
          className={`modal__input ${errors.password ? "modal__input--type-error" : ""}`}
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
          /* FIXED: Converted single underscores to BEM double hyphens (--) for visibility state modifier styling hook toggle attributes */
          className={`modal__error-message ${errors.password ? "modal__error-message--visible" : ""}`}
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
          /* FIXED: Converted single underscores to BEM double hyphens (--) for error state modifier styling hook toggle attributes */
          className={`modal__input ${errors.username ? "modal__input--type-error" : ""}`}
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
          /* FIXED: Converted single underscores to BEM double hyphens (--) for visibility state modifier styling hook toggle attributes */
          className={`modal__error-message ${errors.username ? "modal__error-message--visible" : ""}`}
        >
          {errors.username}
        </span>
      </div>

      {/* Shared Server Fallback Exception Messaging */}
      {serverError && (
        /* FIXED: Changed cross-component block namespace to a clean localized modifier selector */
        <span className="modal__error-message modal__error-message--server" role="alert">{serverError}</span>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;
