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
