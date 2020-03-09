import React, { createContext, useContext, useState, useEffect } from "react";
import { navigate } from "@reach/router";

interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  id: number;
}

interface IAuthContext {
  handleLogout(): void;
  modalState: string;
  users: IUser[] | null;
  currentUser: IUser | null;
  handleLoginSubmit(email: string, password: string): Promise<any>;
  // handleLoginSubmit(email: string, password: string): void;
  handleRegSubmit(email: string, newUser: object): void;
}

const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = (props: any) => {
  const modalStates = {
    success: "success",
    warning: "warning",
    error: "error",
    none: "none"
  };
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
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

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // const handleLoginSubmit = (email: string, password: string) => {
  //   if (users) {
  //     const user = users.find(
  //       (u: IUser) => u.email === email && u.password === password
  //     );
  //     if (user) {
  //       const currentUser: IUser = {
  //         email: user.email,
  //         password: user.password,
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         id: user.id
  //       };
  //       setCurrentUser(currentUser);
  //       navigate("/user");
  //     } else {
  //       setModalState(modalStates.error);
  //       setTimeout(() => setModalState(modalStates.none), 1500);
  //     }
  //   }
  // };

  const handleLoginSubmit = (email: string, password: string) =>
    new Promise((resolve, reject) => {
      const user =
        users &&
        users.find((u: IUser) => u.email === email && u.password === password);
      if (user) {
        resolve({ email, password });
        const currentUser = {
          email: user.email,
          password: user.password,
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

  const handleRegSubmit = (email: string, newUser: IUser) => {
    if (users) {
      const user = users.find((u: IUser) => u.email === email);
      if (user) {
        setModalState(modalStates.warning);
        setTimeout(() => setModalState(modalStates.none), 1500);
      } else {
        setUsers([...users, newUser]);
        setModalState(modalStates.success);
        setTimeout(() => navigate("/"), 1500);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        handleLoginSubmit,
        handleRegSubmit,
        modalState,
        handleLogout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useUser hooks can only be used in UserProvider children");
  }
  return context;
};

export { AuthProvider, AuthContext, AuthConsumer, useAuth };
