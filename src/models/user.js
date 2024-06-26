const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  purchases: { type: [String], required: true, default: [] },
  timecreated: { type: Date, required: true, default: Date.now },
  userAdress: {
    street: { type: String, required: false, default: "" },
    city: { type: String, required: false, default: "" },
    zip: { type: String, required: false, default: "" },
    country: { type: String, required: false, default: "" },
  },
  verified: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("User", userSchema);
