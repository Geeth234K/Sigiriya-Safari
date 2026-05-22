import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
