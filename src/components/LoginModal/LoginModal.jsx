import { useEffect } from "react";
import { useForm } from "../../hooks/useForm"; // Adjust the relative path as needed
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onRedirectClick, onSubmit, isLoading }) {
  // Use the shared useForm hook with initial values
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  // Automatically reset the form fields to empty strings whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__container">
        <button 
          type="button" 
          className="modal__close-btn" 
          onClick={onClose} 
          aria-label="Close modal" 
        />
        <h2 className="modal__title">Sign in</h2>
        
        <form className="modal__form" onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="modal__label-container">
            <label className="modal__label">Email</label>
            <input 
              type="email" 
              name="email" 
              className="modal__input" 
              placeholder="Enter email" 
              value={values.email} 
              onChange={handleChange} 
              required 
            />
            <span className="modal__error-message"></span>
          </div>

          {/* Password input field */}
          <div className="modal__label-container">
            <label className="modal__label">Password</label>
            <input 
              type="password" 
              name="password" 
              className="modal__input" 
              placeholder="Enter password" 
              value={values.password} 
              onChange={handleChange} 
              required 
            />
            <span className="modal__error-message"></span>
          </div>

          {/* Control submit button area */}
          <div className="modal__submit-container">
            <button type="submit" className="modal__submit-btn">
              {isLoading ? "Saving..." : "Sign in"}
            </button>
            <p className="modal__redirect">
              or{" "}
              <button 
                type="button" 
                className="modal__redirect-btn" 
                onClick={onRedirectClick}
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
