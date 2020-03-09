import React, { useState } from "react";
import styles from "./Login.module.css";
import { useAuth } from "../../../providers/UsersProvider";
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

const emailPattern = /^\S+@\S+\.\S+$/;
interface ILogin {
  email: string;
  password: string;
}

const Login: React.FC<ILogin> = () => {
  const { handleLoginSubmit, modalState } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid =
    email.length > 0 && password.length > 0 && emailPattern.test(email);

  return (
    <div>
      {modalState === "error" && (
        <Modal icon={warning} message={"Wrong email or password!"} />
      )}
      <form
        className={styles.logForm}
        onSubmit={e => {
          e.preventDefault();
          handleLoginSubmit(email, password);
        }}
      >
        <label className={styles.logLabel}>Email</label>
        <input
          className={styles.logInput}
          autoFocus
          id="email"
          type="email"
          value={email}
          autoComplete="email"
          onChange={e => setEmail(e.target.value)}
        />
        <label className={styles.logLabel}>Password</label>
        <input
          className={styles.logInput}
          id="password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
        />
        <button className={styles.login} type="submit" disabled={!isFormValid}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
