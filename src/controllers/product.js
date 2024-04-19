const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(StatusCodes.OK).json({ products, nbHits: products.length });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new CustomError(400, "Product ID is required");
    await Product.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new CustomError(400, "Product ID is required");
    const product = await Product.findOne({ _id: id });
    res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new CustomError(400, "Product ID is required");
    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    await product.save();
    res.status(StatusCodes.OK).json({ msg: "Product updated successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  singleProduct,
  updateProducts,
  deleteProduct,
};
