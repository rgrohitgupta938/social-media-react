import React, { useEffect, useRef } from "react";
import "../style/modal.css";

const CreatePostModal = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="heading">
          <span className="title">{title}</span>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="children-content">
          {React.cloneElement(children, { onClose })}
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
