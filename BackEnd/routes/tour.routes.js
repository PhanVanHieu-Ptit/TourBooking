const express = require("express");
const router = express.Router();

const tourController = require("../controllers/TourController");

// tourController.index;
// router.get("/list", tourController.list);
router.get("/find", tourController.find);
router.get("/:id/detail", tourController.detail);
router.delete("/:id/delete", tourController.delete);

module.exports = router;
