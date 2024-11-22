exports.errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: "fail",
    code: err.statusCode || 500,
    message: err.message || "Server Error",
    stack: err.stack,
  });
};
