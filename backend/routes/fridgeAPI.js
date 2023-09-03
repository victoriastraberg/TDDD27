var express = require("express");
var router = express.Router();
const db = require("../admin");

/* Get request for sending id and value for fridge collection in firestore to fridge.js */
router.post("/", async (req, res, next) => {
  var email = req.body.email;

  if (email != "") {
    // Get fridge items from firestore
    const fridgeRef = db.collection(email + "_fridge");
    const snapshot = await fridgeRef.get();
    const array = [];

    snapshot.forEach((doc) => {
      array.push({ id: doc.id, value: doc.data().value });
    });

    res.send(JSON.stringify(array));
  }
});

module.exports = router;
