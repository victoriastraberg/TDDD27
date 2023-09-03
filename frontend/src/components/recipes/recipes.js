import React, { useState, useEffect} from "react";
import "./recipes.css";
import firebase from "../../firebase.js";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
const db = firebase.firestore();

/* Function for recipe item */
function Recipe({ item, deleteItem, addToShoppingList }) {
  const [show, setShow] = useState(false);
  const [fridgeItems, setItems] = useState([]);

  var fridgeArray = [];
  var recipeArray = [];

  // Fetch fridge items that is used for comparison
  const {user} = useAuth0();

  // Initialize fridge page with items from users firestore collection
  useEffect(function initializeEffect() {

    // Post initial values from users firestore (for comparison with fridge items)
    const postItems = async () => {
      try {
        const items = await axios.post("http://localhost:9000/fridgeAPI", {email: user.email})
        setItems(items.data);
      } catch (err) {
        console.error(err.message)
      }
  
    };

    postItems();
    
  }, [])

  // Create array with recipe items
  recipeArray.push(item.ingredientsValue[0].trim().toLowerCase());
  for (let i = 1; i < item.ingredientsValue.length; i++) {
    recipeArray.push(item.ingredientsValue[i].trim().toLowerCase());
  }

  // Create array with fridge items
  for (var i = 0; i < fridgeItems.length; i++) {
    fridgeArray.push(fridgeItems[i].value);
  }

  // Intersection between recipe and fridge items
  function intersectArray(a1, a2) {
    return a1.filter(function (n) {
      return a2.indexOf(n) !== -1;
    });
  }
  var intersectItems = intersectArray(recipeArray, fridgeArray);

  // Difference between recipe and fridge items
  function differenceArray(a1, a2) {
    return a1.filter(function (n) {
      return a2.indexOf(n) === -1;
    });
  }
  var diffItems = differenceArray(recipeArray, fridgeArray);

  // For printing existing and missing ingredients in dropdown
  var existingList = [];
  var missingList = [];

  existingList.push(intersectItems[0]);
  for (let i = 1; i < intersectItems.length; i++) {
    existingList.push("," + intersectItems[i]);
  }

  missingList.push(diffItems[0]);
  for (let i = 1; i < diffItems.length; i++) {
    missingList.push(diffItems[i]);
  }

  return (
    <>
      <div className="recipeBar">
        <button
          type="button"
          className="btnrecipe"
          onClick={() => (show === true ? setShow(false) : setShow(true))}
        >
          {item.recipeValue}
        </button>
        <FaTrash size={20} id={item.id} onClick={deleteItem} />
      </div>
      <div>
        {show && (
          <div>
            <p id="dropdown-content" style={{ color: "green" }}>
              <strong>Existing ingredients:</strong> {existingList}
            </p>
            <div>
              <p
                id={item.ingredientsValue}
                style={{ color: "red", textAlign: "center" }}
              >
                <strong>Missing ingredients:</strong> {missingList + " "}
                <FaShoppingCart
                  size={20}
                  id={missingList}
                  style={{ color: "black" }}
                  onClick={addToShoppingList}
                />
              </p>
            </div>
            <p id="dropdown-content">
              <a className="alink" href={item.linkValue} target="_blank">
                Go To Recipe
              </a>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

/* Handles all functions on recipe page */
function RecipeList() {
  const [recipeValue, setRecipeValue] = useState("");
  const [ingredientsValue, setIngredientsValue] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [addAlert, setAddAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [addShoppingListAlert, setAddShoppingListAlert] = useState(false);
  const [recipeItems, setRecipeItems] = useState([]);

  // Get authenticated user from Auth0
  const {user} = useAuth0();

  // Initialize fridge page with items from users firestore collection
  useEffect(function initializeEffect() {

    // Post initiale recipes
    const postItems = async () => {
      try {
        const items = await axios.post("http://localhost:9000/recipesAPI", {email: user.email})
        setRecipeItems(items.data);
      } catch (err) {
        console.error(err.message)
      }
  
    };
    postItems();
    
  }, [])

  // Gets new state when item is added from the form to firestore
  useEffect(
    function refreshOnAddEffect() {
      if (addAlert) {
        setTimeout(() => {
          setAddAlert(false);
        }, 1000);
      }

      // Update posted values
      const postItems = async () => {
        try {
          const items = await axios.post("http://localhost:9000/recipesAPI", {email: user.email})
          setRecipeItems(items.data);
        } catch (err) {
          console.error(err.message)
        }
    
      };
      postItems();
    },
    [addAlert]
  );

  // Gets new state when ingredients is added to shoopinglist from recipe
  useEffect(
    function refreshOnAddShoppingEffect() {
      if (addShoppingListAlert) {
        setTimeout(() => {
          setAddShoppingListAlert(false);
        }, 1000);
      }

       // Update posted values
      const postItems = async () => {
        try {
          const items = await axios.post("http://localhost:9000/recipesAPI", {email: user.email})
          setRecipeItems(items.data);
        } catch (err) {
          console.error(err.message)
        }
    
      };
      postItems();
    },
    [addShoppingListAlert]
  );

  // Gets new state when item is deleted from firestore
  useEffect(
    function refreshOnDeleteEffect() {
      if (deleteAlert) {
        setTimeout(() => {
          setDeleteAlert(false);
        }, 1000);
      }

       // Update posted values
      const postItems = async () => {
        try {
          const items = await axios.post("http://localhost:9000/recipesAPI", {email: user.email})
          setRecipeItems(items.data);
        } catch (err) {
          console.error(err.message)
        }
    
      };
      postItems();
    },
    [deleteAlert]
  );

  // Add item to firestore and alert user
  const handleSubmit = (e) => {
    e.preventDefault();

    //Add to collection 
    if (recipeValue !== "", ingredientsValue !== "", linkValue !== "") {
    db.collection(user.email + "_recipes")
      .add({
        recipeValue,
        ingredientsValue,
        linkValue,
        list: "recipe",
      })
      .then(() => {
        setRecipeValue("");
        setIngredientsValue("");
        setLinkValue("");
        setAddAlert(true);
      });
    }
  };

  // Add item to shoppinglist collection and remove from recipes collection
  const addToShoppingList = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // Get id of value 
    let idMissing = e.target.parentElement.getAttribute("id");

    //Split missing items (for adding to shopping page)
    let arrItems = idMissing.split(",");
 
    // Add to shopping list collection
    arrItems.forEach((item) => {
      db.collection(user.email + "_shoppinglist")
        .add({
          value: item,
          list: "grocery",
        })
        .then(() => {
          setAddShoppingListAlert(true);
        });
    });
  };

  // Delete item from firestore and recipe page
  const deleteItem = (e) => {
    e.stopPropagation();

    // Get id of value user wants to delete
    let id = e.target.parentElement.getAttribute("id");

    // Delete from recipe collection
    db.collection(user.email + "_recipes")
      .doc(id)
      .delete()
      .then(() => {
        setDeleteAlert(true);
      });
  };

  return (
    <div className="container">
      <h2> What´s your recipes? </h2>
      <div className="recipeList">
        <form onSubmit={handleSubmit}>
          <input
            id="addRecipe"
            type="text"
            value={recipeValue}
            placeholder={"Name of recipe..."}
            onChange={(e) => setRecipeValue(e.target.value)}
          />
          <input
            id="addIngredient"
            type="text"
            value={ingredientsValue}
            placeholder={"Ingredients..."}
            onChange={(e) => setIngredientsValue(e.target.value.split(","))}
          />
          <input
            id="addLink"
            type="text"
            value={linkValue}
            placeholder={"Link..."}
            onChange={(e) => setLinkValue(e.target.value)}
          />
          <button id="button" type="submit">
            Add Recipe
          </button>
        </form>
        {addAlert && <p> Recipe Added Successfully! </p>}
        {deleteAlert && <p> Recipe Deleted Successfully! </p>}
        {addShoppingListAlert && (
          <p> Ingredients Added Successfully To Shopping List! </p>
        )}
        <div id="item">
          {recipeItems &&
            recipeItems.map((item) => (
              <Recipe
                id={addShoppingListAlert}
                item={item}
                deleteItem={deleteItem}
                addToShoppingList={addToShoppingList}
                key={item.id}
              ></Recipe>
            ))}
            {recipeItems.length == 0 && (
              <p id="noitems"> No Recipes! </p>
            )}
        </div>
      </div>
    </div>
  );
}

export default RecipeList;
