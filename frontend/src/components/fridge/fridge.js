import React, { useState, useEffect } from "react";
import "./fridge.css";
import firebase from "../../firebase.js";
import { FaTrash } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
const db = firebase.firestore();

/* Function that returns the item and icon for delete */
function Item({ item, deleteItem }) {
  return (
    <div id="itemBar">
      <div id="itemValue"> {item.value} </div>
      <FaTrash className="trash" id={item.id} onClick={deleteItem} />
    </div>
  );
}

/* Handles all functions on fridge page */
function FridgeList() {
  const [fridgeItems, setItems] = useState([]);
  const [addAlert, setAddAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [value, setValue] = useState("");

  // Get authenticated user from Auth0
  const { user } = useAuth0();

  // Initialize fridge page with items from users firestore collection
  useEffect(function initializeEffect() {
    const postItems = async () => {
      try {
        const items = await axios.post("http://localhost:9000/fridgeAPI", {
          email: user.email,
        });
        setItems(items.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    postItems();
  }, []);

  // Gets new state when item is added from the form to firestore
  useEffect(
    function refreshOnAddEffect() {
      // Print alert when item is added
      if (addAlert) {
        setTimeout(() => {
          setAddAlert(false);
        }, 1500);
      }

      // Post updated items
      const postItems = async () => {
        try {
          const items = await axios.post("http://localhost:9000/fridgeAPI", {
            email: user.email,
          });
          setItems(items.data);
        } catch (err) {
          console.error(err.message);
        }
      };

      postItems();
    },
    [addAlert]
  );

  // Gets new state when item is deleted from firestore
  useEffect(
    function refreshOnDeleteEffect() {
      // Print delete alert when item is removed
      if (deleteAlert) {
        setTimeout(() => {
          setDeleteAlert(false);
        }, 1500);
      }

      // Post updated items
      const postItems = async () => {
        try {
          const items = await axios.post("http://localhost:9000/fridgeAPI", {
            email: user.email,
          });
          setItems(items.data);
        } catch (err) {
          console.error(err.message);
        }
      };

      postItems();
    },
    [deleteAlert]
  );

  // Add item to firestore and page, and alert user
  const handleSubmit = (e) => {
    // Prevents page from doing a refresh
    e.preventDefault();

    // Add to collection and send alert
    if (value !== "") {
      db.collection(user.email + "_fridge")
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

  // Delete item from firestore and page, and alert user
  const deleteItem = (e) => {
    e.stopPropagation();

    // Get id of the item value user wants to delete
    let id = e.target.parentElement.getAttribute("id");

    // Delete from collection and send alert
    db.collection(user.email + "_fridge")
      .doc(id)
      .delete()
      .then(() => {
        setDeleteAlert(true);
      });
  };

  return (
    <div className="container">
      <h2> What's in your fridge? </h2>
      <form className="addBar">
        <input
          id="addItem"
          name="array"
          type="text"
          value={value.trim().toLowerCase()}
          placeholder={"Add Item..."}
          onChange={(e) => setValue(e.target.value)}
        />
        <button id="button" type="submit" onClick={handleSubmit}>
          Add Grocery
        </button>
      </form>
      <div className="fridgeList">
        {addAlert && <p> Grocery Added To ShoppingList! </p>}
        {deleteAlert && <p> Grocery Deleted From Shoppinglist! </p>}
        <div id="item">
          {fridgeItems.map((item) => (
            <Item item={item} deleteItem={deleteItem} key={item.id}></Item>
          ))}
          {fridgeItems.length === 0 && (
            <p id="noitems"> No Groceries In Fridge! </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FridgeList;
