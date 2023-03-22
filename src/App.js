import "./App.css";
import React from "react";
import NavBar from "./components/navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <br></br>
      <div className="centered">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
