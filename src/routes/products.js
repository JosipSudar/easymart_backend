const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  singleProduct,
  updateProducts,
  deleteProduct,
} = require("../controllers/product");

router.route("/").get(getAllProducts).post(createProduct);
router
  .route("/:id")
  .get(singleProduct)
  .patch(updateProducts)
  .delete(deleteProduct);

module.exports = router;
