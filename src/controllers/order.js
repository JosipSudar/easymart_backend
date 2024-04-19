const User = require("../models/User");
const Order = require("../models/order");
const Product = require("../models/product");
const CustomError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const createOrder = async (req, res) => {
  try {
    const products = req.body.orderItems;
    products.forEach(async (product) => {
      const productData = await Product.findOne({ _id: product._id });
      productData.stock -= product.quantity;
      await productData.save();
    });
    const userID = req.body.user;
    const user = await User.findOne({ _id: userID });
    const order = await Order.create(req.body);
    user.purchases.push(order._id);
    await user.save();
    res.status(StatusCodes.CREATED).json({ msg: "Order created successfully" });
  } catch (error) {
    console.log(req.body);
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(StatusCodes.OK).json({ orders });
  } catch (error) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error);
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      throw new CustomError(StatusCodes.BAD_REQUEST, "User ID is required");
    const orders = await Order.find({ user: id });
    res.status(StatusCodes.OK).json({ orders });
  } catch (error) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error);
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new CustomError(400, "Order ID is required");
    const order = await Order.findOne({ _id: id });
    res.status(StatusCodes.OK).json({ order });
  } catch (error) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderByUser,
  getOrderById,
};
