const express = require("express");
const orderController = require("../controllers/order");
const { protect, checkAdmin } = require("../middlewares/auth");
const orderValidator = require("../validation/order");
const router = express.Router();

router.route("/").get(orderController.getAllOrders);

router.route("/:id").delete(orderController.delete).get(orderController.getOne);

router
  .route("/")
  .post(protect, orderValidator.createOrderValidation, orderController.create);

module.exports = router;
