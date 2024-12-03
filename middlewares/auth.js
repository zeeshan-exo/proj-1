const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_KEY } = require("../cred");

const protect = async (req, res, next) => {
  let checkToken;
 
  checkToken = req.cookies?.token;
  console.log(checkToken);
  if (!checkToken) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(checkToken, JWT_KEY);

    const currentUser = await User.findById(decoded._id);

    if (!currentUser) {
      return res
        .status(401)
        .json({ message: "User not found, not authenticated" });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const checkAdmin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = {
  protect,
  checkAdmin,
};
