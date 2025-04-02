import User from "../models/UserModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";

/**
 * @desc Update current user profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

/**
 * @desc Get all users (Admin only)
 * @route GET /api/users
 * @access Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

/**
 * @desc Get user by ID
 * @route GET /api/users/:id
 * @access Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json(user);
});

/**
 * @desc Update user by ID (Admin only)
 * @route PUT /api/users/:id
 * @access Private/Admin
 */
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  user.isAdmin = Boolean(req.body.isAdmin);

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

/**
 * @desc Delete user by ID (Admin only)
 * @route DELETE /api/users/:id
 * @access Private/Admin
 */
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isAdmin) {
    res.status(400);
    throw new Error("You can't delete an admin");
  }

  await User.deleteOne({ _id: user._id });
  res.json({ message: "User deleted successfully" });
});

/**
 * @desc Search users by email
 * @route GET /api/users/search
 * @access Private/Admin
 */
const searchUser = asyncHandler(async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email parameter is required" });
  }

  const users = await User.find({
    email: { $regex: email, $options: "i" },
  }).select("-password");

  res.json(users);
});

export {
  updateCurrentUserProfile,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  searchUser,
};
