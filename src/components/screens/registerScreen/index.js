import React, { useState } from "react";
import "./Register.css";
import Modal from "../../../components/modal/Modal";
import { useUser } from "../../../providers/UsersProvider";
import { navigate } from "@reach/router";
import success from "../../../assets/success.png";
import warning from "../../../assets/warning.png";

const modalStates = {
  success: "success",
  warning: "warning",
  none: "none"
};

const Register = () => {
  const provider = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [modalState, setModalState] = useState(modalStates.none);
  const pattern = /^\S+@\S+\.\S+$/;

  const validateForm = () => {
    return (
      email.length > 0 &&
      password.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      pattern.test(email)
    );
  };

  const handleRegSubmit = () => {
    const newUser = {
      email,
      password,
      firstName,
      lastName
    };
    const user = provider.users.find(u => u.email === email);
    if (user) {
      setModalState(modalStates.warning);
      setTimeout(() => setModalState(modalStates.none), 1500);
    } else {
      provider.setUsers([...provider.users, newUser]);
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
      <form className="reg-form" onSubmit={e => e.preventDefault()}>
        <label className="reg-label">First Name</label>
        <input
          className="reg-input"
          autoFocus
          id="firstName"
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label className="reg-label">Last Name</label>
        <input
          className="reg-input"
          id="lastName"
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label className="reg-label">Email</label>
        <input
          className="reg-input"
          id="email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label className="reg-label">Password</label>
        <input
          className="reg-input"
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="register"
          type="submit"
          disabled={!validateForm()}
          onClick={() => handleRegSubmit()}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
