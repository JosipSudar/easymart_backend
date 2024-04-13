const Order = require("../models/order");
const CustomError = require("../errors/custom-error");

const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ order });
  } catch (error) {
    console.log(req.body);
    throw new CustomError(500, error);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (error) {
    throw new CustomError(500, error);
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.find({ user: id });
    res.status(200).json({ orders });
  } catch (error) {
    throw new CustomError(500, error);
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id });
    res.status(200).json({ order });
  } catch (error) {
    throw new CustomError(500, error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderByUser,
  getOrderById,
};
