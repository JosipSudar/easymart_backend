const Newsletter = require("../models/Newsletter");

const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const newsletter = await Newsletter.create({ email });
    res.status(201).json({ newsletter });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  subscribeToNewsletter,
};
