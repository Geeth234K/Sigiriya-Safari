import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String, required: true },
    accentColor: { type: String, required: true },
    icon: { type: String, required: true },
    heroImage: { type: String },
    heroImageAlt: { type: String },
    duration: { type: String },
    price: { type: String },
    groupInfo: { type: String },
    includedActivities: [
      {
        title: { type: String },
        description: { type: String },
        image: { type: String },
        imageAlt: { type: String }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
