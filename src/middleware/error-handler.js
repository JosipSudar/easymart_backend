const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/custom-error");

const errorHanlderMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: err.message });
};

module.exports = errorHanlderMiddleware;
