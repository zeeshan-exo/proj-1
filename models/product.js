const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productID: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,

    required: [true, "Please enter product name"],
  },
  company: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Enter the prodduct price"],
  },
  details: {
    type: String,
  },
});

const products = mongoose.model("Products", productSchema);

module.exports = products;
