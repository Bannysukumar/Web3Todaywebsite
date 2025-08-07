import React from 'react';

function ImageModal({ imageUrl, closeModal }) {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content">
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
}

export default ImageModal;