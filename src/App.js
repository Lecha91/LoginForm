import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Login from "./components/screens/loginScreen/Login";
import Footer from "./components/footer/Footer";
import Register from "./components/screens/registerScreen/Register";
import UserScreen from "./components/screens/userScreen/UserScreen";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Router>
        <Register path="register" />
        <Login path="/" />
        <UserScreen path="user" />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
