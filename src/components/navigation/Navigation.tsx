import React from "react";
import { Link } from "@reach/router";
import styles from "./Navigation.module.css";
import { useAuth } from "../../providers/UsersProvider";

const Navigation: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className={styles.navigation}>
      <div className={styles.navLeft}>
        <h1>User LogIn Form</h1>
      </div>
      {currentUser !== null ? (
        <div className={styles.navRight}>
          <p>Hello {currentUser.firstName}</p>
        </div>
      ) : (
        <div className={styles.navRight}>
          <Link to="/">LogIn</Link>
          <div className={styles.divider} />
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Navigation;
