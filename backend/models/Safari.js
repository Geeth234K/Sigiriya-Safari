import mongoose from "mongoose";

const safariSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, default: "" },
    originalPrice: { type: Number, required: true, min: 0 },
    discountedPrice: { type: Number, required: true, min: 0 },
    discountPercent: { type: Number, required: true, min: 0 },
    duration: { type: String, required: true },
    groupSize: { type: String, required: true },
    includes: { type: [String], default: [] },
    wildlife: { type: [String], default: [] },
    whatToBring: { type: [String], default: [] },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Safari", safariSchema);
