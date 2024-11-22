const express = require("express");
const orderController = require("../controllers/order");
const { protect, checkAdmin } = require("../middlewares/auth");
const orderValidator = require("../validation/order");
const router = express.Router();

router
  .route("/")
  .post(
    protect,
    orderValidator.createOrderValidation,
    orderController.create
  );

module.exports = router;
