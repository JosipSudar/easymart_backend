const express = require("express");
const router = express.Router();

const { subscribeToNewsletter } = require("../controllers/newsletter");

router.route("/").post(subscribeToNewsletter);

module.exports = router;
