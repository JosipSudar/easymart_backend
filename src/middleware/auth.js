const jwt = require("jsonwebtoken");
const CustomError = require("../errors/custom-error");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomError("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userID, username } = decoded;
    req.user = { userID, username };
    next();
  } catch (error) {
    throw new CustomError("Unauthorized", 401);
  }
};

module.exports = authMiddleware;
