const { body, validationResult, check } = require("express-validator");
const Order = require("../models/orders");
const Product = require("../models/product");

exports.createOrderValidation = [
  body("items").isArray({ min: 1 }).withMessage("Items array cannot be empty"),

  body("contact")
    .isNumeric()
    .withMessage("Contact number should contain only digits")
    .isLength({ min: 11, max: 11 })
    .withMessage("Contact number must contain 11 digits"),

  body("shippingAddress")
    .isString()
    .withMessage("Shipping address must be a valid string")
    .isLength({ min: 10 })
    .withMessage("Shipping address should be at least 10 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    next();
  },
];
