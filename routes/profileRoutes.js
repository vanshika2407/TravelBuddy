const express = require("express")
const router = express.Router()
const profile = require("../contollers/profile");

router.post("/profile", profile.update_profile);

module.exports = router
 