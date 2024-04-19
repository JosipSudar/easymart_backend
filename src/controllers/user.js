const User = require("../models/User");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const sendEmail = async (emailData) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
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
    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    if (user.verified)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Email already verified" });
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
    res.status(StatusCodes.OK).json({ msg: "Email verification link sent" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const checkEmailVerification = async (req, res) => {
  const { token } = req.params;
  if (!token)
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    user.verified = true;
    await user.save();
    res.status(StatusCodes.OK).json({ msg: "Email verified" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already exists" });
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
    res.status(StatusCodes.CREATED).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User does not exist" });
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Incorrect password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      token,
      userID: user._id,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User ID is required" });
    const user = await User.findOne({ _id: id });
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const updateUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const { userData } = req.body;
    const { userAdress } = userData;
    const user = await User.findOne({ _id: id });
    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });

    user.userAdress = userAdress;
    user.markModified("userAdress"); // Tell Mongoose that userAdress has been updated
    await user.save();

    res.status(StatusCodes.OK).json({ msg: "User data updated" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users)
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "No users found" });
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

module.exports = {
  register,
  login,
  getUserById,
  updateUserData,
  sendEmailVerification,
  checkEmailVerification,
  getUsers,
};
