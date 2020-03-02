import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ message, icon }) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.filterLayer}></div>
      <div className={styles.modal}>
        <img src={icon} alt="icon" />
        <h2>{message}</h2>
      </div>
    </div>
  );
};

export default Modal;
