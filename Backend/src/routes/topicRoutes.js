import express from "express";
import {
  createTopic,
  getTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
} from "../controllers/topicController.js";
import { authenticate } from "../middlewares/authMiddleWare.js";

const router = express.Router();

// Route: /api/topics
router.route("/").get(getTopics).post(authenticate, createTopic);

// Route: /api/topics/:id
router
  .route("/:id")
  .get(authenticate, getTopicById)
  .put(authenticate, updateTopic)
  .delete(authenticate, deleteTopic);

export default router;
