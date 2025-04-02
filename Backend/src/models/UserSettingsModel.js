import mongoose from "mongoose";

const userSettingsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    dailyGoal: {
      type: Number,
      default: 10,
      min: 1,
    },
    themePreference: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "light",
    },
    notificationEnabled: {
      type: Boolean,
      default: true,
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    pushNotifications: {
      type: Boolean,
      default: true,
    },
    reminderTime: {
      type: String,
      default: "18:00",
    },
  },
  { timestamps: true }
);

const UserSettings = mongoose.model("UserSettings", userSettingsSchema);
export default UserSettings;
