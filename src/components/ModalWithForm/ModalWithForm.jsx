import { useEffect } from "react";

function ModalWithForm({
  title,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  altButtonText,
  onAltButtonClick,
  children,
  isValid = true, // Pass form validation state if implementing the custom validation hook
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

  return (
    <div 
      className={`modal ${isOpen ? "modal_opened" : ""}`} 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
          aria-label="Close modal"
        />
        <h2 className="modal__title">{title}</h2>
        
        <form className="modal__form" onSubmit={onSubmit} noValidate>
          {children}
          
          {/* Fixed: Grouped the primary and alternate buttons inside a semantic layout container */}
          <div className="modal__submit-container">
            <button
              type="submit"
              className={`modal__submit-button ${
                !isValid ? "modal__submit-button_disabled" : ""
              }`}
              disabled={!isValid}
            >
              {buttonText}
            </button>
            
            {altButtonText && (
              <p className="modal__alt-text">
                or{" "}
                <button
                  type="button"
                  className="modal__alt-button"
                  onClick={onAltButtonClick}
                >
                  {altButtonText}
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
