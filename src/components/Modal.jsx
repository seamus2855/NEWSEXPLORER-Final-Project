import React from 'react';
import './Modal.css';

export default function Modal({ isOpen, onClose, children }) {
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
