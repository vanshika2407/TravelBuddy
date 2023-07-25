const admin = require("firebase-admin");
const credentials = require("./key.json");


admin.initializeApp({
    credential: admin.credential.cert(credentials),
    //storageBucket: 
});

module.exports.db = admin.firestore();