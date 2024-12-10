const Order = require("../models/orders");
const Product = require("../models/product");
const User = require("../models/user");

exports.dashboard = async (req, res, next) => {
  try {
    const [
      orderCount,
      productCount,
      userCount,
      totalRevenue,
      recentOrders,
      topProducts,
    ] = await Promise.all([
      Order.countDocuments(),

      Product.countDocuments(),

      User.countDocuments(),
      Order.aggregate([
        { $unwind: "$items" },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$items.totalAmount" },
          },
        },
      ]).then((result) => (result.length > 0 ? result[0].totalRevenue : 0)),

      Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .limit(5)
        .select("user items shippingAddress createdAt"),

      Order.aggregate([
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.productID",
            totalQuantity: { $sum: "$items.quantity" },
          },
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $project: {
            productDetails: { $arrayElemAt: ["$productDetails", 0] },
            totalQuantity: 1,
          },
        },
      ]),
    ]);

    const response = {
      stats: {
        orderCount,
        productCount,
        userCount,
        totalRevenue,
      },
      recentOrders,
      topProducts: topProducts.map((item) => ({
        product: item.productDetails?.name || "Product Name Not Found",
        company: item.productDetails?.company || "Company Not Found",
        totalSold: item.totalQuantity,
      })),
    };

    console.log(response);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
