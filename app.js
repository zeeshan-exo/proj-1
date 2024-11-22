const express = require("express");
const product = require("./routes/product");
const user = require("./routes/users");
const order = require("./routes/order");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/user", user);

app.use("/api/product", product);

app.use("/api/order", order);

app.all("*", (req, res, next) => {
  throw new Error("this path not found");
});

app.use(errorHandler);

module.exports = app;
