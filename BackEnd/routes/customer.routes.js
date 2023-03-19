const express = require("express");
const router = express.Router();
const customerControllers = require("../controllers/CustomerControllers");
const { authenticateToken } = require("../middlewares/authentication");
const { customerInsert } = require("../middlewares/customer");

router.patch(
  "/update",
  authenticateToken,
  customerInsert,
  customerControllers.update
);

module.exports = router;
