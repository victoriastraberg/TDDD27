import React, { useState, useEffect } from "react";
import "./shopping_list.css";
import firebase from "../../firebase.js";
import { FaRegCheckCircle, FaTrash } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
const db = firebase.firestore();

/* Function that returns the item and icon for delete and add to fridge */
function Item({ item, deleteItem, addToFridge }) {
  return (
    <div id="itemBar">
      <div id="itemValue"> {item.value} </div>
      <div id={item.id}>
        <FaTrash className="trash" size={20} onClick={deleteItem} />
      </div>
      <div id={item.value}>
        <p id={item.id}>
          <FaRegCheckCircle
            className="circle"
            size={20}
            onClick={addToFridge}
          />
        </p>
      </div>
    </div>
  );
}

/* Handles all functions on shopping list page */
function ShoppingList() {
  const [shoppingItems, setItems] = useState([]);
  const [addAlert, setAddAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [addFridgeAlert, setAddFridgeAlert] = useState(false);
  const [value, setValue] = useState("");

  // Get authenticated user from Auth0
  const {user} = useAuth0();

  // Initialize shopping list page with items from users firestore collection
  useEffect(function initializeEffect() {

    const postItems = async () => {
      try {
        const items = await axios.post("http://localhost:9000/shoppinglistAPI", {email: user.email})
        setItems(items.data);
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
        }, 1500);
      }

      // Post updated items
      const postItems = async () => {
        try {
          const items = await axios.post("http://localhost:9000/shoppinglistAPI", {email: user.email})
          setItems(items.data);
        } catch (err) {
          console.error(err.message)
        }
    
      };
      postItems();
    },
    [addAlert]
  );

  // Gets new state when item is added to fridge and deleted from shopping list
  useEffect(
    function refreshOnAddFridgeEffect() {
      if (addFridgeAlert) {
        setTimeout(() => {
          setAddFridgeAlert(false);
        }, 1000);
      }

      // Post updated items
      const postItems = async () => {
        try {
          const items = await axios.post("http://localhost:9000/shoppinglistAPI", {email: user.email})
          setItems(items.data);
        } catch (err) {
          console.error(err.message)
        }
    
      };
      postItems();
    },
    [addFridgeAlert]
  );

  // Gets new state when item is deleted from firestore
  useEffect(
    function refreshOnDeleteEffect() {
      if (deleteAlert) {
        setTimeout(() => {
          setDeleteAlert(false);
        }, 1000);
      }

      // Post updated items
      const postItems = async () => {
        try {
          const items = await axios.post("http://localhost:9000/shoppinglistAPI", {email: user.email})
          setItems(items.data);
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
    e.stopPropagation();

    if (value !== "") {
    db.collection(user.email + "_shoppinglist")
      .add({
        value,
        list: "grocery",
      })
      .then(() => {
        setValue("");
        setAddAlert(true);
      });
    }
  };

  // Add item to fridge collection and remove from shoppinglist collection
  const addToFridge = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // Get the id and the value of the item user wants to delete/add
    let valueId = e.target.parentElement.parentElement.getAttribute("id");
    let id = e.target.parentElement.getAttribute("id");

    // Delete from shopping collection
    db.collection(user.email + "_shoppinglist")
      .doc(id)
      .delete();

    // Add to fridge collection
    db.collection(user.email + "_fridge")
      .add({
        value: valueId,
        list: "grocery",
      })
      .then(() => {
        setAddFridgeAlert(true);
      });
  };

  // Delete item from firestore and page, and alert user
  const deleteItem = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the id of item user wants to delete
    let id = e.target.parentElement.parentElement.getAttribute("id");

    // Delete from collection 
    db.collection(user.email + "_shoppinglist")
      .doc(id)
      .delete()
      .then(() => {
        setDeleteAlert(true);
      });
  };

  return (
    <div className="container">
      <h2> What do I need to buy? </h2>
      <div className="fridgeList">
        <form className="addBar">
          <input
            id="addItem"
            type="text"
            value={value.trim().toLowerCase()}
            placeholder={"Add Item..."}
            onChange={(e) => setValue(e.target.value)}
          />
          <button id="button" type="submit" onClick={handleSubmit}>
            Add Grocery
          </button>
        </form>
        <div className="shoppingList">
          {addAlert && <p> Grocery Added To ShoppingList! </p>}
          {deleteAlert && <p> Grocery Deleted From Shoppinglist! </p>}
          {addFridgeAlert && <p> Grocery Added To Fridge! </p>}
          <div id="item">
            {shoppingItems.map((item) => (
              <Item
                item={item}
                deleteItem={deleteItem}
                addToFridge={addToFridge}
                key={item.id}
              />
            ))}
            {shoppingItems.length == 0 && (
              <p id="noitems"> No Groceries In Shopping List! </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingList;
