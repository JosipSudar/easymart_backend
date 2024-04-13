const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const sendEmail = async (emailData) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: emailData.to,
    subject: emailData.subject,
    html: emailData.html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const link = `${process.env.CLIENT_URL}/verify-email/${token}`;
    const emailData = {
      to: email,
      subject: "Email Verification",
      html: `
        <h1>Please click on the link to verify your email</h1>
        <a href=${link}>${link}</a>
      `,
    };
    await sendEmail(emailData);
    res.status(200).json({ msg: "Email verification link sent" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    let role = "user";
    if (email === process.env.ADMIN_EMAIL) role = "admin";
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Incorrect password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, userID: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ msg: "User ID is required" });
    const user = await User.findOne({ _id: id });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const { userData } = req.body;
    const { userAdress } = userData;
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.userAdress = userAdress;
    user.markModified("userAdress"); // Tell Mongoose that userAdress has been updated
    await user.save();

    res.status(200).json({ msg: "User data updated" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  register,
  login,
  getUserById,
  updateUserData,
  sendEmailVerification,
};
