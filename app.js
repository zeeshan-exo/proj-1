const express = require("express");
const product = require("./routes/product");
const user = require("./routes/users");
const order = require("./routes/order");
const dashboard = require ("./routes/dashboard")
const { errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/user", user);

app.use("/api/dashboard", dashboard)

app.use("/api/product", product);

app.use("/api/order", order);

app.all("*", (req, res, next) => {
  throw new Error("this path not found");
});

app.use(errorHandler);

module.exports = app;
