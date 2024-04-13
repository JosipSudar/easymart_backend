const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUserById,
  updateUserData,
  sendEmailVerification,
} = require("../controllers/user");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/:id").get(getUserById);
router.route("/:id").put(updateUserData);
router.route("/verify").post(sendEmailVerification);

module.exports = router;
