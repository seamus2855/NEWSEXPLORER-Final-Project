import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({
  isOpen,
  onClose,
  handleAltClick, // Switches to the register modal layout view
  onLogin,        // Form submission action handler
  isLoading,
  serverError,    
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
    if (isValid && typeof onLogin === "function") {
      onLogin({
        email: values.email,
        password: values.password,
      });
    }
  };

  return (
    <ModalWithForm
      title="Sign in" 
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Signing in..." : "Sign in"}
      /* Mapped props to align perfectly with ModalWithForm configuration keys */
      isButtonDisabled={!isValid} 
      redirectText="Sign up"
      onRedirectClick={handleAltClick}
    >
      {/* Email input field */}
      <div className="modal__label-container">
        <label className="modal__label" htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          name="email"
          /* FIXED: Updated single underscores to BEM double hyphens (--) for the input error modifier */
          className={`modal__input ${errors.email ? "modal__input--type-error" : ""}`}
          placeholder="Enter email"
          required
          value={values.email || ""}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "login-email-error" : undefined}
        />
        <span 
          id="login-email-error" 
          /* FIXED: Updated single underscores to BEM double hyphens (--) for the visible message modifier */
          className={`modal__error-message ${errors.email ? "modal__error-message--visible" : ""}`}
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
          /* FIXED: Updated single underscores to BEM double hyphens (--) for the input error modifier */
          className={`modal__input ${errors.password ? "modal__input--type-error" : ""}`}
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
          /* FIXED: Updated single underscores to BEM double hyphens (--) for the visible message modifier */
          className={`modal__error-message ${errors.password ? "modal__error-message--visible" : ""}`}
        >
          {errors.password}
        </span>
      </div>

      {/* Shared Server Fallback Exception Messaging */}
      {serverError && (
        /* FIXED: Changed cross-component block namespace to a clean contextual modifier class */
        <span className="modal__error-message modal__error-message--server" role="alert">
          {serverError}
        </span>
      )}
    </ModalWithForm>
  );
}

export default LoginModal;
