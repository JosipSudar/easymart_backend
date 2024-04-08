const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products, nbHits: products.length });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
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
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateProducts = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  getAllProducts,
  createProduct,
  getCategory,
  getBrand,
  getProductByCategory,
  getProductByBrand,
  singleProduct,
  updateProducts,
};
