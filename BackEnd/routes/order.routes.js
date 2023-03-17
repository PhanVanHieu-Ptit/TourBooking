const express = require("express");
const JWT = require("../utils/_JWT");
const token = require("../utils/token");
const router = express.Router();
const orderController = require("../controllers/OrderTourController");
const { authenticateToken } = require("../middlewares/authentication");

// orderController.index;

router.get("/number-order", authenticateToken, orderController.getNumberOrder);
router.get("/list", authenticateToken, orderController.filter);
router.get("/ordered-tour", authenticateToken, orderController.orderedTour);
// router.get("/list", orderController.list);
router.get("/find", authenticateToken, orderController.find);
router.post("/order", authenticateToken, orderController.order);
router.put("/:id/update", authenticateToken, orderController.update);
router.get("/:id/detail", authenticateToken, orderController.detail);
router.patch(
  "/:id/confirm-using",
  authenticateToken,
  orderController.confirmUsing
);
router.patch("/:id/confirm-cancel", authenticateToken, orderController.cancel);
router.patch("/:id/confirm", authenticateToken, orderController.confirm);
router.patch("/:id/cancel", authenticateToken, orderController.cancel);
router.patch("/:id/customer-cancel", authenticateToken, orderController.cancel);
router.patch(
  "/:id/customer-need-cancel",
  authenticateToken,
  orderController.customerNeedCancel
);

router.get("/token", function (req, res) {
  // var user = {
  //   name: "Admin",
  //   email: "admin@gmail.com",
  // };
  // const _token = await JWT.make(user);
  // res.send({ token: _token });
  const _token = token.getToken("pvh@gmail.com");
  res.send({ token: _token });
});

router.get("/check_token", async function (req, res) {
  try {
    var _token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0sImlhdCI6MTY3NzYzMTgzOSwiZXhwIjoxNjc3NjM1NDM5fQ.gNGBQZa3qR1QtEb5hZPS2QbVaf6emkZ9Y1Hq_xJ_abE";

    const data = await JWT.check(_token);
    res.send(data);
  } catch (err) {
    res.send("Ma token khong hop le");
  }
});

module.exports = router;
