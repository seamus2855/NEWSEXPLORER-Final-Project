import { useEffect } from "react";
import "./PopupWithForm.css";

function PopupWithForm({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  buttonText,
  redirectText,
  onRedirectClick,
}) {
  // Close modal via Escape key listener
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Close modal via clicking the dark overlay mask background
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
          aria-label="Close popup"
        />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" onSubmit={onSubmit} noValidate>
          {children}
          <button type="submit" className="popup__submit-button">
            {buttonText}
          </button>
        </form>
        <p className="popup__redirect">
          or{" "}
          <button
            type="button"
            className="popup__redirect-link"
            onClick={onRedirectClick}
          >
            {redirectText}
          </button>
        </p>
      </div>
    </div>
  );
}

export default PopupWithForm;
