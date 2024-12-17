const Product = require("../models/product");
const SubCategory = require("../models/subCategories");
const Category = require("../models/categories");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../cred");

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await Category.create({
      name,
    });

    console.log(name);
    if (!category) throw new Error("Category creation failed");
    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.find();

    if (!category) throw new Error("no category found");
    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

exports.subCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await Category.findOne({ name: "Electronics" });

    const subCategory = await SubCategory.create({
      name,
      category: category._id,
    });

    console.log(name);

    if (!subCategory) throw new Error("Category creation failed");
    res.status(200).json({
      status: "success",
      data: subCategory,
    });
  } catch (err) {
    next(err);
  }
};

exports.getsubCategory = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.find().populate(
      "category",
      "_id name"
    );

    if (!subCategory) throw new Error("no category found");
    res.status(200).json({
      status: "success",
      data: subCategory,
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, company, price, details, category, subCategory } = req.body;
    const validCategory = await Category.findOne({ name: category });
    const validSubCategory = await SubCategory.findOne({ name: subCategory });
    console.log(validCategory);
    console.log(validSubCategory);
    console.log(category, subCategory);

    const product = await Product.create({
      name,
      company,
      price,
      details,
      category: validCategory._id,
      subCategory: validSubCategory._id,
    });

    //for test comment the below code till response
    // const usertoken = req.headers.authorization.split(" ")[1];

    // const payload = jwt.verify(usertoken, JWT_KEY);
    console.log(product, name, company);
    if (!product) throw new Error("Product creation failed");

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};
exports.getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page <= 0 || limit <= 0) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive integers.",
      });
    }

    const skip = (page - 1) * limit;

    const products = await Product.find({})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("category", "name")
      .populate("subCategory", "name");

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    const pagination = {
      totalProducts,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };

    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products found for the given page.",
        pagination,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      pagination,
      data: products,
    });
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: err.message,
    });
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const getOneproduct = await Product.findOne({ _id: id })
      .populate("category", "name")
      .populate("subCategory", "name");

    if (!getOneproduct) throw new Error("product not found");

    res.status(200).json({
      status: "success",
      data: getOneproduct,
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { name, company, price, details } = req.body;

    const updateProduct = await Product.findByIdAndUpdate(
      id,
      { name, company, price, details },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updateProduct,
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteProduct = await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      data: deleteProduct,
    });
  } catch (err) {
    next(err);
  }
};
