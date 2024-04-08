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

const getCategory = async (req, res) => {
  res.send("get category");
};

const getBrand = async (req, res) => {
  res.send("get brand");
};

const getProductByCategory = async (req, res) => {
  res.send("get product by category");
};

const getProductByBrand = async (req, res) => {
  res.send("get product by brand");
};

const singleProduct = async (req, res) => {
  res.send("get single product");
};

module.exports = {
  getAllProducts,
  createProduct,
  getCategory,
  getBrand,
  getProductByCategory,
  getProductByBrand,
  singleProduct,
};
