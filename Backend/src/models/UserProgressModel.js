import mongoose from "mongoose";

const userProgressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    attemptDate: {
      type: Date,
      default: Date.now,
    },
    result: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      validate: {
        validator: function (v) {
          return v >= 0 && v <= 5;
        },
        message: (props) => `${props.value} must be between 0 and 5!`,
      },
    },
    answerTime: {
      type: Number,
      required: true,
      min: 0,
    }, // in seconds
    confidenceLevel: {
      type: Number,
      min: 1,
      max: 5,
      validate: {
        validator: function (v) {
          return v >= 1 && v <= 5;
        },
        message: (props) => `${props.value} must be between 1 and 5!`,
      },
    },
  },
  { timestamps: true }
);

// Index để tìm kiếm nhanh dựa trên user và ngày thử
userProgressSchema.index({ user: 1, attemptDate: 1 });

const UserProgress = mongoose.model("UserProgress", userProgressSchema);
export default UserProgress;
