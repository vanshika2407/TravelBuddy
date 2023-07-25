const express = require("express");
const router = express.Router()
const auth = require("../contollers/auth");
const { generateIternary } = require("../contollers/iternary");

router.post("/get-iternary", generateIternary);

module.exports = router;