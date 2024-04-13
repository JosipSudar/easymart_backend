const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderByUser,
  getOrderById,
} = require("../controllers/order");

router.route("/").get(getOrders).post(createOrder);
router.route("/:id").get(getOrderById);
router.route("/user/:id").get(getOrderByUser);

module.exports = router;
