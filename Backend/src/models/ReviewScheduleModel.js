import mongoose from "mongoose";

const reviewScheduleSchema = mongoose.Schema(
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
    nextReviewDate: {
      type: Date,
      required: true,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    lastResult: {
      type: Number,
      min: 0,
      max: 5,
    },
    easeFactor: {
      type: Number,
      default: 2.5,
      min: 1.3,
      max: 2.5,
      validate: {
        validator: function (v) {
          return v >= 1.3 && v <= 2.5;
        },
        message: (props) => `${props.value} must be between 1.3 and 2.5!`,
      },
    },
  },
  { timestamps: true }
);

// Tạo index cho cặp user và question để đảm bảo tính duy nhất
reviewScheduleSchema.index({ user: 1, question: 1 }, { unique: true });

const ReviewSchedule = mongoose.model("ReviewSchedule", reviewScheduleSchema);
export default ReviewSchedule;
