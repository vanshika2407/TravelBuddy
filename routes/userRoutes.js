const express = require("express");
const router = express.Router()
const user = require("../contollers/user");
const {isAuth} = require("../middleware");

router.post("/add-trip", user.addTrip);

//get all trips
router.post('/get-trips', user.getTripDetails);

router.post("/get-nearby", user.getTrips);

router.post("/get-images", user.tripImages);

router.post("/get-user", user.getUser);

module.exports = router;