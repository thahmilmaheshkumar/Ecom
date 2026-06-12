import handleError from "../helpper/handleError.js";

export default (err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.code === 11000) {
    console.log(err.keyValue);
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    next(new handleError(message, 400));
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
