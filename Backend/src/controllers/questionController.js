import asyncHandler from "../middlewares/asyncHandler.js";
import { Question } from "../models/index.js";

/**
 * @desc    Create a new question
 * @route   POST /api/questions
 * @access  Private/Admin
 */
const createQuestion = asyncHandler(async (req, res) => {
  const { content, type, difficulty, priority, answers, tags, media, topic } =
    req.body;

  // Validate required fields
  if (!content || !type || !difficulty || !topic) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Validate answers based on question type
  if (type === "multiple_choice" && (!answers || answers.length < 2)) {
    res.status(400);
    throw new Error("Multiple choice questions must have at least 2 answers");
  }

  // Ensure at least one answer is correct for multiple choice or true/false
  if (
    (type === "multiple_choice" || type === "true_false") &&
    (!answers || !answers.some((answer) => answer.isCorrect))
  ) {
    res.status(400);
    throw new Error("At least one answer must be marked as correct");
  }

  const question = await Question.create({
    content,
    type,
    difficulty,
    priority: priority || 3,
    answers: answers || [],
    tags: tags || [],
    media: media || [],
    topic,
    user: req.user._id,
  });

  if (question) {
    res.status(201).json(question);
  } else {
    res.status(400);
    throw new Error("Invalid question data");
  }
});

/**
 * @desc    Get all questions
 * @route   GET /api/questions
 * @access  Private
 */
const getQuestions = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const topic = req.query.topic ? { topic: req.query.topic } : {};
  const difficulty = req.query.difficulty
    ? { difficulty: Number(req.query.difficulty) }
    : {};
  const type = req.query.type ? { type: req.query.type } : {};

  const keyword = req.query.keyword
    ? {
        content: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Question.countDocuments({
    ...topic,
    ...difficulty,
    ...type,
    ...keyword,
  });

  const questions = await Question.find({
    ...topic,
    ...difficulty,
    ...type,
    ...keyword,
  })
    .populate("topic", "name")
    .populate("tags", "name")
    .populate("user", "name")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({
    questions,
    page,
    pages: Math.ceil(count / pageSize),
    totalCount: count,
  });
});

/**
 * @desc    Get question by ID
 * @route   GET /api/questions/:id
 * @access  Private
 */
const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id)
    .populate("topic", "name")
    .populate("tags", "name")
    .populate("user", "name");

  if (question) {
    res.json(question);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

/**
 * @desc    Update question
 * @route   PUT /api/questions/:id
 * @access  Private/Admin
 */
const updateQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    return res.status(404).json({
      message: "Question not found",
    });
  }

  // Check authorization
  if (
    !req.user.isAdmin &&
    question.user.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({
      message: "Not authorized to update this question",
    });
  }

  const { content, type, difficulty, priority, answers, tags, media, topic } =
    req.body;

  // Validate question type
  if (
    type &&
    type !== question.type &&
    !["multiple_choice", "essay", "true_false", "matching"].includes(type)
  ) {
    return res.status(400).json({
      message: "Invalid question type",
    });
  }

  // Update fields
  question.content = content || question.content;
  question.type = type || question.type;
  question.difficulty = difficulty || question.difficulty;
  question.priority = priority || question.priority;
  question.answers = answers || question.answers;
  question.tags = tags || question.tags;
  question.media = media || question.media;
  question.topic = topic || question.topic;

  const updatedQuestion = await question.save();
  res.json(updatedQuestion);
});

/**
 * @desc    Delete question
 * @route   DELETE /api/questions/:id
 * @access  Private/Admin
 */
const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  // Check if user is admin or the creator of the question
  if (
    !req.user.isAdmin &&
    question.user.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Not authorized to delete this question");
  }

  await Question.deleteOne({ _id: question._id });
  res.json({ message: "Question removed" });
});

/**
 * @desc    Get questions by topic
 * @route   GET /api/questions/topic/:topicId
 * @access  Private
 */
const getQuestionsByTopic = asyncHandler(async (req, res) => {
  const questions = await Question.find({ topic: req.params.topicId })
    .populate("topic", "name")
    .populate("tags", "name")
    .populate("user", "name");

  if (questions) {
    res.json(questions);
  } else {
    res.status(404);
    throw new Error("No questions found for this topic");
  }
});

/**
 * @desc    Get random questions for quiz
 * @route   GET /api/questions/random
 * @access  Private
 */
const getRandomQuestions = asyncHandler(async (req, res) => {
  const { topic, count, difficulty } = req.query;

  const filter = {};

  if (topic) {
    filter.topic = topic;
  }

  if (difficulty) {
    filter.difficulty = Number(difficulty);
  }

  const questions = await Question.aggregate([
    { $match: filter },
    { $sample: { size: Number(count) || 10 } },
  ]);

  await Question.populate(questions, [
    { path: "topic", select: "name" },
    { path: "tags", select: "name" },
    { path: "user", select: "name" },
  ]);

  res.json(questions);
});

export {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionsByTopic,
  getRandomQuestions,
};
