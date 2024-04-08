const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  singleProduct,
} = require("../controllers/product");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(singleProduct);

module.exports = router;
