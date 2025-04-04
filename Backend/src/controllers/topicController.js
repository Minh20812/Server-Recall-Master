import asyncHandler from "../middlewares/asyncHandler.js";
import { Topic } from "../models/index.js";

const createTopic = asyncHandler(async (req, res) => {
  const { name, description, icon } = req.body;

  // Validate required fields
  if (!name || !description || !icon) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const topic = await Topic.create({
    name,
    description,
    icon,
    user: req.user._id,
  });

  if (topic) {
    res.status(201).json(topic);
  } else {
    res.status(400);
    throw new Error("Invalid topic data");
  }
});

const getTopics = asyncHandler(async (req, res) => {
  const topics = await Topic.find({}).populate("user", "name");
  res.json(topics);
});

/**
 * @desc    Get topic by ID
 * @route   GET /api/topics/:id
 * @access  Private
 */
const getTopicById = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id).populate("user", "name");

  if (!topic) {
    res.status(404);
    throw new Error("Topic not found");
  }

  res.json(topic);
});

/**
 * @desc    Update topic
 * @route   PUT /api/topics/:id
 * @access  Private/Admin
 */
const updateTopic = asyncHandler(async (req, res) => {
  const { name, description, icon } = req.body;
  const topic = await Topic.findById(req.params.id);

  if (!topic) {
    res.status(404);
    throw new Error("topic not found");
  }

  if (!req.user.isAdmin && topic.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this topic");
  }

  // Update fields
  topic.name = name || topic.name;
  topic.description = description || topic.description;
  topic.icon = icon || topic.icon;

  const updatedTopic = await topic.save();
  res.json(updatedTopic);
});

/**
 * @desc    Delete topic
 * @route   DELETE /api/topics/:id
 * @access  Private/Admin
 */
const deleteTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);

  if (!topic) {
    res.status(404);
    throw new Error("topic not found");
  }

  // Check if user is admin or the creator of the topic
  if (!req.user.isAdmin && topic.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this topic");
  }

  await topic.deleteOne({ _id: topic._id });
  res.json({ message: "Topic removed" });
});

export { createTopic, getTopics, getTopicById, updateTopic, deleteTopic };
