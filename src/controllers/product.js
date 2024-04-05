const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  res.send("get all products");
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
};
