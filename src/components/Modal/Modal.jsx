import React, { useEffect } from 'react';
import './Modal.css';

export default function Modal({ isOpen, onClose, children }) {
  // Listen for the Escape key to close the modal globally
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up the event listener when the modal unmounts or closes
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Closes the modal only if the user clicks the backdrop overlay directly
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-container">
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          type="button"
          aria-label="Close modal"
        >
          &times;
        </button>
        
        {/* Modal Content */}
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}
