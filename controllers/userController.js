const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userInfo) => {
  return jwt.sign(userInfo, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

exports.signup = async (req, res, next) => {
  try {
    const { name, phone_number, email, password } = req.body;

    if (!name || !email || !password || !phone_number) {
      return res.status(400).json({ success: false, message: "Please fill required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone_number,
      email,
      password: hashedPassword,
    });
    const token = generateToken({ id: user._id, email: user.email, role: user.role, status: user.status });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { token }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please fill required fields" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = generateToken({ id: user._id, email: user.email, role: user.role, status: user.status });

    res.status(201).json({
      success: true,
      message: "User loged in successfully",
      data: { token }
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password -createdAt -updatedAt").lean();
    if (!user)
      return res.status(401).json({ message: "User is not found" });
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
