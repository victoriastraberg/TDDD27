var express = require("express");
var router = express.Router();
const db = require("../admin");

/* Get request for sending id and value for recipe collection in firestore to recips.js */
router.post("/", async (req, res, next) => {

  var email = req.body.email;

  if (email != "") {
    // Get recipe items from firestore
    const recipesRef = db.collection(email + "_recipes");
    const snapshot = await recipesRef.get();
    const array = [];
    snapshot.forEach((doc) => {
      array.push({
        id: doc.id,
        recipeValue: doc.data().recipeValue,
        ingredientsValue: doc.data().ingredientsValue,
        linkValue: doc.data().linkValue,
      });
    });
    res.send(JSON.stringify(array));
  }
});

module.exports = router;
