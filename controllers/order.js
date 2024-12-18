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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .skip(skip)
      .limit(limit)
      .populate("user", "name email")
      .exec();

    const totalOrders = await Order.countDocuments();

    const totalPages = Math.ceil(totalOrders / limit);

    const pagination = {
      totalOrders,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };

    res.status(200).json({
      status: "success",
      pagination,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { items, contact, shippingAddress } = req.body;

  try {
    let order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }

    if (items && Array.isArray(items)) {
      for (const item of items) {
        const { productID, quantity } = item;
        const product = await Product.findById(productID);

        if (!product) {
          throw new Error(`Product with ID ${productID} not found`);
        }

        if (quantity < 1) {
          throw new Error(
            `Quantity for product ${productID} must be at least 1`
          );
        }

        item.totalAmount = product.price * quantity;
      }
      order.items = items;
    }

    if (contact) order.contact = contact;
    if (shippingAddress) order.shippingAddress = shippingAddress;

    console.log("Modified:", order.isModified());
    const updatedOrder = await order.save();

    const populatedOrder = await Order.findById(updatedOrder._id).populate(
      "user",
      "name email"
    );

    res.status(200).json({
      status: "success",
      data: populatedOrder,
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
