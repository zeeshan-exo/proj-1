const { body, validationResult } = require("express-validator");

exports.UserVerfication = [
  body("email").notEmpty().isEmail().withMessage("email not exist"),

  body("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("passeord must be at least 6 characters"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .isEmpty()
    .withMessage("Invalid role"),

  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    
    next();
  },
];
