const express = require("express");
const router = express.Router();
const accountControllers = require("../controllers/AccountControllers");
const {
  authenticateToken,
  managerCheck,
  staffCheck,
} = require("../middlewares/authentication");
const { accountInsert } = require("../middlewares/account");
const { customerInsert } = require("../middlewares/customer");

router.post(
  "/sign-up",
  accountInsert,
  customerInsert,
  accountControllers.signUp
);
router.post("/sign-in", accountControllers.signIn);
router.patch(
  "/change-password",
  authenticateToken,
  accountControllers.changePassword
);
router.patch(
  "/change-password-in-forgot",
  authenticateToken,
  accountControllers.changePasswordInForgot
);
router.post("/forgot-password", accountControllers.forgotPassword);
router.get(
  "/change-password-form",
  authenticateToken,
  accountControllers.changePasswordForm
);
module.exports = router;
