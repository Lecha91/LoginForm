import React, { useState } from "react";
import styles from "./Login.module.css";
import { navigate } from "@reach/router";
import { useUser } from "../../../providers/UsersProvider";
import Modal from "../../modal/Modal";
import warning from "../../../assets/warning.png";

// const login = ({ username, password }) => new Promise((resolve, reject) => {
//   if (username === 'test' && password === 'test') {
//     resolve({ username, password })
//   } else {
//     reject(null)
//   }
// })

// login({}).then(() => {
//   console.log('uspesno')
// }).catch(() => {
//   console.log('greska')
// })

const Login = () => {
  const { users, setCurrentUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWarningModal, setShowWarningModal] = useState(false);

  const isFormValid = email.length > 0 && password.length > 0;

  const handleLoginSubmit = () => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const currentUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id
      };
      setCurrentUser(currentUser);
      navigate("/user");
    } else {
      setShowWarningModal(true);
      setTimeout(() => setShowWarningModal(false), 1500);
    }
  };

  return (
    <div>
      {showWarningModal && (
        <Modal icon={warning} message={"Wrong email or password!"} />
      )}
      <form className={styles.logForm} onSubmit={e => e.preventDefault()}>
        <label className={styles.logLabel}>Email</label>
        <input
          className={styles.logInput}
          autoFocus
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label className={styles.logLabel}>Password</label>
        <input
          className={styles.logInput}
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="on"
        />
        <button
          className={styles.login}
          type="submit"
          disabled={!isFormValid}
          onClick={handleLoginSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
