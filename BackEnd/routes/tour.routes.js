const express = require("express");
const router = express.Router();

const tourController = require("../controllers/TourController");
const { tourInsert } = require("../middlewares/tour");
const { managerCheck, authenticateToken } = require('../middlewares/authentication');

router.get("/list", tourController.list);
router.get("/:id/detail", tourController.detail);
router.delete("/:id/delete", authenticateToken, managerCheck, tourController.delete);
router.post("/add", authenticateToken, managerCheck, tourInsert, tourController.add);

module.exports = router;
