import mongoose from "mongoose";

const topicSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
    },
  },
  { timestamps: true }
);

const Topic = mongoose.model("Topic", topicSchema);
export default Topic;
