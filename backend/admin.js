/* Require Admin SDK that lets server interact with Firebase */
var admin = require("firebase-admin");

/* Initialize service account with values from config.json */
var serviceAccount = require("./config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/* Initialize firestore and export */
const db = admin.firestore();
module.exports = db;
