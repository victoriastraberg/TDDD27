import React, {useState, useEffect}from "react";
import "./homepage.css";
import shopping from "../images/shopping.png";
import fridge from "../images/fridge2.png";
import recipes from "../images/food.png";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

/* Component for the homepage layout */ 
function HomePage() {

  return (
    <div className="body">
      <div className="row2">
        <div className="shopping_list">
          <img id="shopping" src={shopping} />
          <button className="btn btn-dark">
            {" "}
            <Link
              to="shoppinglist"
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              SHOPPING LIST{" "}
            </Link>{" "}
          </button>
        </div>
        <div className="fridge">
          <img id="fridge" src={fridge} />
          <button className="btn btn-dark">
            {" "}
            <Link
              to="fridgelist"
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              FRIDGE{" "}
            </Link>{" "}
          </button>
        </div>
        <div className="recipes">
          <img id="rec" src={recipes} />
          <button className="btn btn-dark">
            <Link
              to="recipelist"
              style={{ textDecoration: "none", color: "white" }}
            >
              
              RECIPES
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
