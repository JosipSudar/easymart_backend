const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  purchases: { type: [String], required: true },
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
