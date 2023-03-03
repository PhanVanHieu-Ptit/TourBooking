const express = require("express");
const router = express.Router();

const tourController = require("../controllers/TourController");
const { tourInsert } = require("../middlewares/tour");
const {
  managerCheck,
  authenticateToken,
  staffCheck,
} = require("../middlewares/authentication");

router.get("/list", tourController.list);
router.get("/:id/detail", tourController.detail);
router.delete(
  "/:id/delete",
  authenticateToken,
  managerCheck,
  tourController.delete
);
router.post("/add", authenticateToken, managerCheck, tourInsert, tourController.add);
router.post("/update", authenticateToken, staffCheck, tourInsert, tourController.update);

module.exports = router;
