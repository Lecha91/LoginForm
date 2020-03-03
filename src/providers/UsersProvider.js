import React, { createContext, useContext, useState, useEffect } from "react";
import { navigate } from "@reach/router";

const UserContext = createContext(null);

const UserProvider = props => {
  const modalStates = {
    success: "success",
    warning: "warning",
    error: "error",
    none: null
  };
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [modalState, setModalState] = useState(modalStates.none);

  useEffect(() => {
    fetch("http://my-json-server.typicode.com/lecha91/fakeApi/users")
      .then(res => {
        return res.json();
      })
      .then(data => {
        setUsers(data);
      });
  }, []);

  // const handleLoginSubmit = (email, password) => {
  //   const user = users.find(u => u.email === email && u.password === password);
  //   if (user) {
  //     const currentUser = {
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       id: user.id
  //     };
  //     setCurrentUser(currentUser);
  //     navigate("/user");
  //   } else {
  //     setModalState(modalStates.error);
  //     setTimeout(() => setModalState(modalStates.none), 1500);
  //   }
  // };

  const handleLoginSubmit = ({ email, password }) =>
    new Promise((resolve, reject) => {
      const user = users.find(
        u => u.email === email && u.password === password
      );
      if (user) {
        resolve({ email, password });
        const currentUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id
        };
        setCurrentUser(currentUser);
        navigate("/user");
      } else {
        reject(null);
        setModalState(modalStates.error);
        setTimeout(() => setModalState(modalStates.none), 1500);
      }
    });

  const handleRegSubmit = (email, newUser) => {
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
    <UserContext.Provider
      value={{
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        handleLoginSubmit,
        handleRegSubmit,
        modalState,
        setModalState
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

const UserConsumer = UserContext.Consumer;

const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser hooks can only be used in UserProvider children");
  }
  return context;
};

export { UserProvider, UserContext, UserConsumer, useUser };
