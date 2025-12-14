function errorHandler(err, req, res, next) {
  console.error(err);
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({
    message: err.message || "Server error"
  });
}

module.exports = errorHandler;