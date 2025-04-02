import mongoose from "mongoose";

const answerSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    explanation: {
      type: String,
      trim: true,
    },
  },
  { _id: true }
);

const mediaSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "audio", "video"],
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      trim: true,
    },
  },
  { _id: true }
);

const questionSchema = mongoose.Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["multiple_choice", "essay", "true_false", "matching"],
    },
    difficulty: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    priority: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 3,
    },
    answers: [answerSchema],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    media: [mediaSchema],
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
