const mongoose = require("mongoose");
const product = require("../models/product");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: [true, "Please provide the number of products"],
        min: [1, "Quantity should be at least 1"],
      },
      totalAmount: {
        type: Number,
        required: [true, "Please provide a total amount"],
        min: [0, "Total amount cannot be negative"],
      },
    },
  ],
  contact: {
    type: Number,
    required: [true, "Please provide a valid phone number"],
    min: [11, "contact number must contain 11 digits"],
  },
  shippingAddress: {
    type: String,
    required: [true, "Shipping address is required"],
    minlength: [10, "Shipping address should be at least 10 characters long"],
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
