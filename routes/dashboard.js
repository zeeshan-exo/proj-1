const express = require("express");
const dashboardCpontroller = require("../controllers/dashboard");
const router = express.Router();

router.route("/").get(dashboardCpontroller.dashboard);

module.exports = router;
