const express = require("express");
const auth = require("../controllers/auth");
const usercontroller = require("../controllers/user");
const validation = require("../validation/user");
const { checkAdmin, protect } = require("../middlewares/auth");
const router = express.Router();

router.route("/logout").get(auth.logout);

router.route("/").get(protect, checkAdmin, usercontroller.getAll);

router
  .route("/:id")
  .patch(usercontroller.updateOne)
  .delete(protect, checkAdmin, usercontroller.deleteOne)
  .get(protect, checkAdmin, usercontroller.getOne);

router.route("/signup").post(validation.UserVerfication, auth.signup);
router.route("/login").post(validation.UserVerfication, auth.login);

module.exports = router;
