import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    safariId: { type: mongoose.Schema.Types.ObjectId, ref: "Safari" },
    bookingType: { type: String, enum: ["booking", "itinerary"], default: "booking" },
    fullName: { type: String },
    email: { type: String },
    whatsapp: { type: String },
    checkInDate: { type: Date },
    checkOutDate: { type: Date },
    guests: { type: Number },
    interests: [{ type: String }],
    requests: { type: String },
    totalPrice: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
