import React, { useState } from "react";
import styles from "./Register.module.css";
import Modal from "../../modal/Modal";
import { useUser } from "../../../providers/UsersProvider";
import { navigate } from "@reach/router";
import success from "../../../assets/success.png";
import warning from "../../../assets/warning.png";

const modalStates = {
  success: "success",
  warning: "warning",
  none: "none"
};

const emailPattern = /^\S+@\S+\.\S+$/;

const Register = () => {
  const { users, setUsers } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [modalState, setModalState] = useState(modalStates.none);

  const isFormValid =
    email.length > 0 &&
    password.length > 0 &&
    firstName.length > 0 &&
    lastName.length > 0 &&
    emailPattern.test(email);

  const handleRegSubmit = () => {
    const newUser = {
      email,
      password,
      firstName,
      lastName
    };
    const user = users.find(u => u.email === email);
    if (user) {
      setModalState(modalStates.warning);
      setTimeout(() => setModalState(modalStates.none), 1500);
    } else {
      setUsers([...users, newUser]);
      setModalState(modalStates.success);
      setTimeout(() => navigate("/"), 1500);
    }
  };
  return (
    <div>
      {modalState === modalStates.success && (
        <Modal icon={success} message={"Success, please login..."} />
      )}
      {modalState === modalStates.warning && (
        <Modal icon={warning} message={"Choose different email!"} />
      )}
      <form className={styles.regForm} onSubmit={e => e.preventDefault()}>
        <label className={styles.regLabel}>First Name</label>
        <input
          className={styles.regInput}
          autoFocus
          id="firstName"
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label className={styles.regLabel}>Last Name</label>
        <input
          className={styles.regInput}
          id="lastName"
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label className={styles.regLabel}>Email</label>
        <input
          className={styles.regInput}
          id="email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label className={styles.regLabel}>Password</label>
        <input
          className={styles.regInput}
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className={styles.register}
          type="submit"
          disabled={!isFormValid}
          onClick={handleRegSubmit}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
