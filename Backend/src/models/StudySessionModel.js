import mongoose from "mongoose";

const studySessionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
    questionsReviewed: {
      type: Number,
      default: 0,
      min: 0,
    },
    correctCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    sessionType: {
      type: String,
      enum: ["daily_review", "cramming", "spaced_repetition", "custom"],
      default: "daily_review",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const StudySession = mongoose.model("StudySession", studySessionSchema);
export default StudySession;
