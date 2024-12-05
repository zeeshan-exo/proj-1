const { body, validationResult } = require("express-validator");

exports.UserVerfication = [
  body("email").notEmpty().isEmail().withMessage("email not exist"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .notEmpty()
    .withMessage("Invalid role"),

  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    next();
  },
];
