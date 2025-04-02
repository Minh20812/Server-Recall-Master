import mongoose from "mongoose";

const statisticsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    totalQuestionsAnswered: {
      type: Number,
      default: 0,
      min: 0,
    },
    correctAnswers: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalStudyTime: {
      type: Number,
      default: 0,
      min: 0,
    }, // in minutes
    streakDays: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    dailyStats: [
      {
        date: {
          type: Date,
          required: true,
        },
        questionsAnswered: {
          type: Number,
          default: 0,
        },
        correctCount: {
          type: Number,
          default: 0,
        },
        studyTime: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

const Statistics = mongoose.model("Statistics", statisticsSchema);
export default Statistics;
