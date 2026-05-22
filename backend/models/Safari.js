import mongoose from "mongoose";

const safariSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    durationHours: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Safari", safariSchema);
