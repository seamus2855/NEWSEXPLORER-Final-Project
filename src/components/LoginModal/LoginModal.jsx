import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onRedirectClick, onSubmit, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm({ email: "", password: "" });
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && !isLoading) {
      onSubmit(values);
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
      isButtonDisabled={!isValid || isLoading}
      redirectText="Sign up"
      onRedirectClick={onRedirectClick}
    >
      <div className="modal__label-container">
        <label htmlFor="login-email" className="modal__label">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          name="email"
          className={`modal__input ${errors.email ? "modal__input_type_error" : ""}`}
          placeholder="Enter email"
          value={values.email || ""}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        <span
          className={`modal__error-message ${
            errors.email ? "modal__error-message_visible" : ""
          }`}
        >
          {errors.email}
        </span>
      </div>

      <div className="modal__label-container">
        <label htmlFor="login-password" className="modal__label">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          name="password"
          className={`modal__input ${errors.password ? "modal__input_type_error" : ""}`}
          placeholder="Enter password"
          value={values.password || ""}
          onChange={handleChange}
          minLength="4"
          disabled={isLoading}
          required
        />
        <span
          className={`modal__error-message ${
            errors.password ? "modal__error-message_visible" : ""
          }`}
        >
          {errors.password}
        </span>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
