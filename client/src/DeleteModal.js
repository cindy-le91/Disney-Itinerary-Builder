import React from 'react';

const Modal = ({ closeModal, visible }) => {
  const handleModalClose = () => {
    closeModal(); // Call the closeModal function passed as a prop
  };

  const modalStyle = {
    display: visible ? 'block' : 'none', // Apply "display: block" when visible is true
  };

  return (
    <div className="modal" tabIndex="-1" style={modalStyle}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleModalClose}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to remove this event?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleModalClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: '#FF8686', border: 'none' }}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
