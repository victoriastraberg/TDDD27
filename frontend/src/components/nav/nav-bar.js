import React from "react";
import AuthNav from "./auth-nav";
import "./nav-bar.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { FaHome, FaUser } from "react-icons/fa";

/* The navigation bar provided at the top of all components */
const NavBar = () => {
  return (
    <div className="menu">
      <Link to="/">
        {" "}
        <FaHome
          style={{ color: "black", fontSize: "2.5em", margin: "20px" }}
        />{" "}
      </Link>
      <div className="title-content">
        <h1> Happy Fridge </h1>
        <img id="logo" src={logo}></img>
      </div>
      <nav>
        <AuthNav />
      </nav>
      <Link id="profile" to="/profile">
        {" "}
        <FaUser
          style={{ color: "black", fontSize: "2.5em", margin: "10px" }}
        />{" "}
      </Link>
    </div>
  );
};

export default NavBar;
