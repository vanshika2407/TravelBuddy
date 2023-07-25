const express = require("express");
const router = express.Router()
const auth = require("../contollers/auth");

// router.post("/sign-up", auth.SignUp);
router.post("/login", auth.login);
router.post("/create_acc", auth.create_account);
router.get("/verify_mail/:email/:id", auth.verify_mail);
router.get("/verify_phone/:email/:id", auth.verify_phone);
router.post("/sos", auth.sos);


module.exports = router;