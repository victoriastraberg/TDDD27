var express = require("express");
var router = express.Router();
const db = require("../admin");

/* Get request for sending id and value for recipe collection in firestore to shoppinglist.js */
router.post("/", async (req, res, next) => {

  var email = req.body.email;

  if (email != "") {
    // Get recipe items from firestore
    const shoppinglistRef = db.collection(email + "_shoppinglist");
    const snapshot = await shoppinglistRef.get();
    const array = [];
    snapshot.forEach((doc) => {
      array.push({ id: doc.id, value: doc.data().value });
    });
    res.send(JSON.stringify(array));
  }
});

module.exports = router;
