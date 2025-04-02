import mongoose from "mongoose";

const tagSchema = mongoose.Schema(
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
    color: {
      type: String,
      default: "#CCCCCC",
      validate: {
        validator: function (v) {
          return /^#[0-9A-F]{6}$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid hex color!`,
      },
    },
  },
  { timestamps: true }
);

// Tạo index cho cặp user và name để đảm bảo tính duy nhất
tagSchema.index({ user: 1, name: 1 }, { unique: true });

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
