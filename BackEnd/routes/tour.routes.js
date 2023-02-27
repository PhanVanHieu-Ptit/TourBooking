const express = require("express");
const router = express.Router();

const tourController = require("../controllers/TourController");

// tourController.index;
router.get("/find", tourController.find);
router.get("/:id/detail", tourController.detail);

module.exports = router;
