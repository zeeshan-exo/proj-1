const Order = require("../models/orders");
const Product = require("../models/product");
const User = require("../models/user");

exports.create = async (req, res, next) => {
  try {
    const user = req.user;

    const { items, contact, shippingAddress } = req.body;

    for (const item of items) {
      const { productID, quantity } = item;
      const product = await Product.findById(productID);

      if (!product) {
        throw new Error(`Product with ID not found`);
      }

      if (quantity < 1) {
        throw new Error(`Quantity for product must be at least 1`);
      }

      item.totalAmount = product.price * quantity;
    }

    const newOrder = new Order({
      user: user._id,
      items,
      contact,
      shippingAddress,
    });

    await newOrder.save();
    const newuser = await User.findById(newOrder.user).select("name email");
    newOrder.user = newuser;

    res.status(201).json({
      status: "success",
      data: newOrder,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user", "name email").exec();

    res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ _id: id })
      .populate("user", "name email")
      .exec();

    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    console.log("order del");

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: deletedOrder,
    });
  } catch (error) {
    next(error);
  }
};
