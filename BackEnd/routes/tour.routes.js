const express = require("express");
const router = express.Router();

const tourController = require("../controllers/TourController");
const { tourInsert } = require("../middlewares/tour");
const {
  managerCheck,
  authenticateToken,
  staffCheck,
  decodedToken,
} = require("../middlewares/authentication");

router.get("/list", decodedToken, tourController.list);
router.get("/:id/detail", tourController.detail);
router.delete(
  "/:id/delete",
  authenticateToken,
  managerCheck,
  tourController.delete
);
router.post(
  "/add",
  authenticateToken,
  staffCheck,
  tourInsert,
  tourController.add
);
router.put(
  "/:id/update",
  authenticateToken,
  staffCheck,
  tourInsert,
  tourController.update
);

module.exports = router;
