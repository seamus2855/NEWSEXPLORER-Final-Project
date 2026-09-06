import { useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import { useForm } from "../../hooks/useForm"; // Adjust this path to match your custom hooks location
import "./RegisterModal.css";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  handleAltClick,
  serverError,
  isRegistrationSuccess,
  onSignInLinkClick,
  isLoading, // Added: Supports changing submission text during active network calls
}) {
  // Use the shared useForm hook with your initial schema structures
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    username: "",
  });

  // Clear component input data fields whenever the modal resets or opens
  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "", username: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      email: values.email,
      password: values.password,
      name: values.username,
    });
  };

  // Check if form fields have passed minimal HTML5 layout validation constraints
  const isFormValid =
    values.email && values.password && values.username.length >= 2;

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
      buttonText={isLoading ? "Saving..." : "Sign up"} // Fixed: Dynamically renders loading indicators
      altButtonText="Sign in"
      onAltButtonClick={handleAltClick}
      isValid={isFormValid}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Enter email"
          required
          value={values.email}
          onChange={handleChange}
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
          value={values.password}
          onChange={handleChange}
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
          value={values.username}
          onChange={handleChange}
        />
        <span className="modal__error"></span>
      </label>

      {/* Fixed: Positioned inside the form element so it flows above the submit container safely */}
      {serverError && (
        <span className="register-modal__form-error">{serverError}</span>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;
