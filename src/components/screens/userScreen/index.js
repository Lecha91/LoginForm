import React, { useEffect } from "react";
import "./UserScreen.css";
import { navigate } from "@reach/router";
import { useUser } from "../../../providers/UsersProvider";

const UserScreen = () => {
  const provider = useUser();

  useEffect(() => {
    /// If someone gets to /user route
    // /// Redirect to home
    if (provider.currentUser === null) {
      navigate("/");
    }
  });

  const handleLogout = () => {
    provider.setCurrentUser(null);
  };

  return (
    provider.currentUser && (
      <div className="user-screen">
        <h1>User info:</h1>
        <div className="info">
          <h3>{provider.currentUser.firstName}</h3>
          <h3>{provider.currentUser.lastName}</h3>
        </div>
        <button className="logout" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    )
  );
};

export default UserScreen;
