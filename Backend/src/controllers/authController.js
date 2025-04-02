import User from "../models/UserModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please provide all required fields");
  }

  const userExists = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
  });

  if (userExists) {
    res.status(400);
    throw new Error(
      userExists.email === email.toLowerCase()
        ? "Email already registered"
        : "Username already taken"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  createToken(res, newUser._id);

  res.status(201).json({
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
  });
});

/**
 * @desc Login user
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (
    !existingUser ||
    !(await bcrypt.compare(password, existingUser.password))
  ) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  createToken(res, existingUser._id);
  res.status(200).json({
    _id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
  });
});

/**
 * @desc Logout user
 * @route POST /api/auth/logout
 * @access Public
 */
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
});

/**
 * @desc Get current user's profile
 * @route GET /api/auth/profile
 * @access Private
 */
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json(user);
});

export { createUser, loginUser, logoutCurrentUser, getCurrentUserProfile };
