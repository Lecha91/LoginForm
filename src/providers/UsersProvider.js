import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext(null);

const UserProvider = props => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const getData = async () => {
    await axios
      .get("http://my-json-server.typicode.com/lecha91/fakeApi/users")
      .then(res => {
        setUsers(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider
      value={{ users, setUsers, currentUser, setCurrentUser }}
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
