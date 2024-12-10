const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: true,
    trim: true,
  },
});

const Category = mongoose.model("categories", categorySchema);
module.exports = Category;
