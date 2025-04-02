import mongoose from "mongoose";

const achievementSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "streak_milestone",
        "questions_milestone",
        "perfect_session",
        "topic_mastery",
        "first_import",
        "first_review",
      ],
    },
    awardedAt: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Achievement = mongoose.model("Achievement", achievementSchema);
export default Achievement;
