import express from "express";
import {
  updateCurrentUserProfile,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  searchUser,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.put("/profile", authenticate, updateCurrentUserProfile);
router.get("/search", authenticate, searchUser);

// Route cho admin quản lý user
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

router.get("/", authenticate, authorizeAdmin, getUsers);

export default router;
