import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import Navigation from "./components/navigation";
import Login from "./components/screens/loginScreen";
import Footer from "./components/footer";
import Register from "./components/screens/registerScreen";
import UserScreen from "./components/screens/userScreen";

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
