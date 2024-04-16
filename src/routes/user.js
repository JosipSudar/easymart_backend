const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUserById,
  updateUserData,
  sendEmailVerification,
  checkEmailVerification,
  getUsers,
} = require("../controllers/user");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/:id").get(getUserById);
router.route("/:id").put(updateUserData);
router.route("/verify").post(sendEmailVerification);
router.route("/verify/:token").get(checkEmailVerification);
router.route("/").get(getUsers);

module.exports = router;
