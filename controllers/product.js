const Product = require("../models/product");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../cred");

exports.create = async (req, res, next) => {
  try {

    const { productID, name, company, price, details } = req.body;

    const product = await Product.create({
      productID,
      name,
      company,
      price,
      details,
    });

    //for test comment the below code till response
    const usertoken = req.headers.authorization.split(" ")[1];

    const payload = jwt.verify(usertoken, JWT_KEY);

    const user = await User.find({ _id: payload._id });

    if (!user) {
      throw new Error("Invalid Token");
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};
//get product
exports.getAll = async (req, res, next) => {
  try {

    const product = await Product.find();

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {

    const { id } = req.params;

    const getOneproduct = await Product.findOne({ _id: id });

    if (!getOneproduct) throw new Error("product not found");

    res.status(200).json({
      status: "success",
      data: getOneproduct,
    });
  } catch (err) {
    next(err);
  }
};

//update product
exports.update = async (req, res, next) => {

  const { id } = req.params;

  try {

    const { productID, name, company, price, details } = req.body;

    const updateProduct = await Product.findByIdAndUpdate(
      id,
      { productID, name, company, price, details },
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
//del product

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
