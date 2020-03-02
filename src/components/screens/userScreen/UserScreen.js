import React from "react";
import styles from "./UserScreen.module.css";
import { navigate } from "@reach/router";
import { useUser } from "../../../providers/UsersProvider";

const UserScreen = () => {
  const { currentUser, setCurrentUser } = useUser();

  if (!currentUser) {
    navigate("/");
  }

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    currentUser && (
      <div className={styles.userScreen}>
        <h1>User info:</h1>
        <div className={styles.info}>
          <h3>{currentUser.firstName}</h3>
          <h3>{currentUser.lastName}</h3>
        </div>
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    )
  );
};

export default UserScreen;
