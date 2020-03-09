import React, { useState } from "react";
import styles from "./Register.module.css";
import Modal from "../../modal/Modal";
import { useAuth } from "../../../providers/UsersProvider";
import success from "../../../assets/success.png";
import warning from "../../../assets/warning.png";

const emailPattern = /^\S+@\S+\.\S+$/;

const Register: React.FC = () => {
  const { handleRegSubmit, modalState } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const isFormValid =
    email.length > 0 &&
    password.length > 0 &&
    firstName.length > 0 &&
    lastName.length > 0 &&
    emailPattern.test(email);

  const neWUser = {
    email,
    password,
    firstName,
    lastName
  };

  return (
    <div>
      {modalState === "success" && (
        <Modal icon={success} message={"Success, please login..."} />
      )}
      {modalState === "warning" && (
        <Modal icon={warning} message={"Choose different email!"} />
      )}
      <form
        className={styles.regForm}
        onSubmit={e => {
          e.preventDefault();
          handleRegSubmit(email, neWUser);
        }}
      >
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
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label className={styles.regLabel}>Password</label>
        <input
          className={styles.regInput}
          type="password"
          id="password"
          value={password}
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className={styles.register}
          type="submit"
          disabled={!isFormValid}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
