// Catches anything thrown/rejected inside route handlers that wasn't already
// caught, so the API never leaks stack traces or hangs a request.
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production" && status === 500
      ? "Something went wrong on our end. Please try again."
      : err.message;

  res.status(status).json({ success: false, error: message });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
};