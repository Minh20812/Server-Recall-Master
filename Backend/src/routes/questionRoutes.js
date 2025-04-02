import express from "express";
import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionsByTopic,
  getRandomQuestions,
} from "../controllers/questionController.js";
import { authenticate } from "../middlewares/authMiddleWare.js";

const router = express.Router();

// @route   POST /api/questions
// @desc    Create a new question
// @access  Private/Admin
// Allow any authenticated user to create questions
router.post("/", authenticate, createQuestion);

// @route   GET /api/questions
// @desc    Get all questions with pagination and filters
// @access  Private
router.get("/", authenticate, getQuestions);

// @route   GET /api/questions/random
// @desc    Get random questions for quiz
// @access  Private
router.get("/random", authenticate, getRandomQuestions);

// @route   GET /api/questions/topic/:topicId
// @desc    Get questions by topic
// @access  Private
router.get("/topic/:topicId", authenticate, getQuestionsByTopic);

// @route   GET /api/questions/:id
// @desc    Get question by ID
// @access  Private
router.get("/:id", authenticate, getQuestionById);

// @route   PUT /api/questions/:id
// @desc    Update question
// @access  Private/Admin or question creator
router.put("/:id", authenticate, updateQuestion);

// @route   DELETE /api/questions/:id
// @desc    Delete question
// @access  Private/Admin or question creator
router.delete("/:id", authenticate, deleteQuestion);

export default router;
