import React from "react";
import { Link } from "@reach/router";
import "./Navigation.css";
import { useUser } from "../../providers/UsersProvider";

const Navigation = () => {
  const provider = useUser();
  const renderNavRight = () => {
    return provider.currentUser !== null ? (
      <div className="nav-right">
        <p>Hello {provider.currentUser.firstName}</p>
      </div>
    ) : (
      <div className="nav-right">
        <Link to="/">LogIn</Link>
        <div className="divider" />
        <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <div className="navigation">
      <div className="nav-left">
        <h1>User LogIn Form</h1>
      </div>
      {renderNavRight()}
    </div>
  );
};

export default Navigation;
