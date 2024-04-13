const express = require("express");
const router = express.Router();

const { register, login, getUserById } = require("../controllers/user");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/:id").get(getUserById);

module.exports = router;
