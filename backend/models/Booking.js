import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    safariId: { type: mongoose.Schema.Types.ObjectId, ref: "Safari" },
    checkInDate: { type: Date },
    checkOutDate: { type: Date },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
