const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: [true, "Please provide a ref to category"],
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategories",
    required: [true, "Please provide a ref to category"],
  },
});

const products = mongoose.model("Products", productSchema);

module.exports = products;
