const { body, validationResult } = require("express-validator");

exports.productValidator = [
  body("name").notEmpty().withMessage("provide products name"),
  body("price")
    .notEmpty()
    .isFloat({ gt: 0 })
    .withMessage("Price must be in positive figures"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    next();
  },
];
