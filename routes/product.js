const express = require("express");
const productController = require("../controllers/product");
const auth=require("../middlewares/auth.js")
const router = express.Router();

router.route("/").get(productController.getProduct).post(auth.protection,productController.createProduct)

router.route("/:id").patch( auth.protection,productController.updateProduct).delete(auth.protection,productController.deleteProduct);

module.exports = router;
