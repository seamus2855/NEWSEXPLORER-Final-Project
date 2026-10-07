import { useEffect } from "react";
import "./ModalWithForm.css"; // Ensure standard wrapper styling is pulled in

function ModalWithForm({
  title,
  name, // Added for semantic naming if needed for CSS or forms
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  isButtonDisabled = false, // Sync with your modal implementations
  redirectText,             // Sync with your modal implementations
  onRedirectClick,         // Sync with your modal implementations
  children,
}) {
  // Close modal on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpen, onClose]);

  // Close modal on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Generate a clean ID for the screen-reader heading link
  const titleId = `modal-title-${name || "form"}`;

  return (
    <div 
      /* FIXED: Updated single underscore (_) to standard BEM double hyphens (--) for the opened modifier */
      className={`modal ${isOpen ? "modal--opened" : ""}`} 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
          aria-label="Close modal"
        />
        <h2 id={titleId} className="modal__title">{title}</h2>
        
        <form className="modal__form" name={name} onSubmit={onSubmit} noValidate>
          {children}
          
          <div className="modal__submit-container">
            <button
              type="submit"
              /* FIXED: Updated single underscore (_) to standard BEM double hyphens (--) for the disabled button modifier */
              className={`modal__submit-button ${
                isButtonDisabled ? "modal__submit-button--disabled" : ""
              }`}
              disabled={isButtonDisabled}
            >
              {buttonText}
            </button>
            
            {redirectText && (
              <p className="modal__alt-text">
                or{" "}
                <button
                  type="button"
                  className="modal__alt-button"
                  onClick={onRedirectClick}
                >
                  {redirectText}
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
