const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: [true, "Please provide a ref to category"],
  },
});

const SubCategory = mongoose.model("subcategories", SubCategorySchema);
module.exports = SubCategory;
