const express = require("express");
const productController = require("../controllers/product");
const validation = require("../validation/productsValidator.js");
const { protect, checkAdmin } = require("../middlewares/auth.js");
const router = express.Router();

router
  .route("/")
  .get(productController.getAll)
  .post(validation.productValidator, productController.create);

router
  .route("/:id")
  .get(productController.getOne)
  .patch(validation.productValidator, productController.update)
  .delete(productController.delete);

//for tests uncomment the below code
// router
//   .route("/")
//   .get(productController.getAllProduct)
//   .post(productController.createProduct);

module.exports = router;
