const express = require("express");
const router = express.Router();

const orderController = require("../controllers/OrderTourController");

// orderController.index;
router.get("/list", orderController.list);
router.get("/find", orderController.find);
router.get("/:id/detail", orderController.detail);
router.patch("/:id/confirm-using", orderController.confirmUsing);
router.patch("/:id/confirm-cancel", orderController.confirmCancel);
router.patch("/:id/confirm", orderController.confirm);
router.patch("/:id/cancel", orderController.cancel);
router.patch("/:id/customer-cancel", orderController.customerCancel);
router.patch("/:id/customer-need-cancel", orderController.customerNeedCancel);
router.post("/:id/order", orderController.order);

module.exports = router;
