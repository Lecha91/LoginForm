import React, { useState } from "react";
import "./Login.css";
import { navigate } from "@reach/router";
import { useUser } from "../../../providers/UsersProvider";
import Modal from "../../modal/Modal";
import warning from "../../../assets/warning.png";

const Login = () => {
  const provider = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleLogInClick = userData => {
    provider.setCurrentUser(userData);
    navigate("/user");
  };

  const handleLogin = () => {
    provider.users.forEach(user => {
      if ((user.email === email) & (user.password === password)) {
        const data = {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id
        };
        handleLogInClick(data);
      } else {
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 1500);
      }
    });
  };

  return (
    <div>
      {modalVisible && (
        <Modal icon={warning} message={"Wrong email or password!"} />
      )}
      <form className="log-form" onSubmit={e => e.preventDefault()}>
        <label className="log-label">Email</label>
        <input
          className="log-input"
          autoFocus
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label className="log-label">Password</label>
        <input
          className="log-input"
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="on"
        />
        <button
          className="login"
          type="submit"
          disabled={!validateForm()}
          onClick={() => handleLogin()}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
