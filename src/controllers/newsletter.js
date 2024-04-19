const { StatusCodes } = require("http-status-codes");
const Newsletter = require("../models/Newsletter");

const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email is required" });
    }
    const newsletter = await Newsletter.create({ email });
    res.status(StatusCodes.CREATED).json({ newsletter });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

module.exports = {
  subscribeToNewsletter,
};
