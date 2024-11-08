const express = require("express");
const productController = require("../controllers/product");
const auth=require("../middlewares/auth.js")
const router = express.Router();

router.route("/products").get(productController.getProduct).post(auth.protection,productController.createProduct)

router.route("/products/:id").patch( auth.protection,productController.updateProduct).delete(auth.protection,productController.deleteProduct);

module.exports = router;
