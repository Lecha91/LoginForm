import React from "react";
import "./Modal.css";

const Modal = ({ message, icon }) => {
  return (
    <div className="modal-container">
      <div className="filter-layer"></div>
      <div className="modal">
        <img src={icon} alt="icon" />
        <h2>{message}</h2>
      </div>
    </div>
  );
};

export default Modal;
