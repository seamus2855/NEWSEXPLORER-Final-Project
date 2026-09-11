import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/UseFormAndValidation"; // Use a combined state hook if available, or pass values from useForm
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onRedirectClick, onSubmit, isLoading }) {
  // Recommendation: Use a form hook that outputs values, errors, and form validity
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  // Reset form inputs and errors every time the modal mounts or toggles open
  useEffect(() => {
    if (isOpen) {
      resetForm({ email: "", password: "" });
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
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
      isButtonDisabled={!isValid}
      redirectText="Sign up"
      onRedirectClick={onRedirectClick}
    >
      {/* Email input field */}
      <div className="modal__label-container">
        <label className="modal__label">Email</label>
        <input
          type="email"
          name="email"
          className={`modal__input ${errors.email ? "modal__input_type_error" : ""}`}
          placeholder="Enter email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <span className={`modal__error-message ${errors.email ? "modal__error-message_visible" : ""}`}>
          {errors.email}
        </span>
      </div>

      {/* Password input field */}
      <div className="modal__label-container">
        <label className="modal__label">Password</label>
        <input
          type="password"
          name="password"
          className={`modal__input ${errors.password ? "modal__input_type_error" : ""}`}
          placeholder="Enter password"
          value={values.password || ""}
          onChange={handleChange}
          minLength="4"
          required
        />
        <span className={`modal__error-message ${errors.password ? "modal__error-message_visible" : ""}`}>
          {errors.password}
        </span>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
