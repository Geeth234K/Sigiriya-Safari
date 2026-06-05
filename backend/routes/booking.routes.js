import { Router } from "express";
import Booking from "../models/Booking.js";

const router = Router();

const itineraryPricing = {
  "jeep safari": 45,
  "village tours": 8,
  "local food": 8
};

const normalizeText = (value) => (typeof value === "string" ? value.trim().toLowerCase() : "");

const normalizeInterests = (interests) => {
  if (Array.isArray(interests)) {
    return interests.map((interest) => normalizeText(interest)).filter(Boolean);
  }
  if (typeof interests === "string") {
    return interests
      .split(",")
      .map((interest) => normalizeText(interest))
      .filter(Boolean);
  }
  return [];
};

const calculateItineraryTotal = (interests) =>
  normalizeInterests(interests).reduce(
    (sum, interest) => sum + (itineraryPricing[interest] || 0),
    0
  );

const applyItineraryTotal = (data) => {
  const shouldCompute =
    data?.bookingType === "itinerary" ||
    (Array.isArray(data?.interests) && data.interests.length > 0) ||
    typeof data?.interests === "string";
  if (!shouldCompute) return data;
  const existingTotal = Number(data?.totalPrice);
  if (Number.isFinite(existingTotal) && existingTotal > 0) {
    return data;
  }
  const computedTotal = calculateItineraryTotal(data?.interests);
  return { ...data, totalPrice: Number(computedTotal.toFixed(2)) };
};

router.get("/", async (_req, res) => {
  try {
    const bookings = await Booking.find().populate("userId roomId safariId");
    const response = bookings.map((booking) => applyItineraryTotal(booking.toObject()));
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("userId roomId safariId");
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(applyItineraryTotal(booking.toObject()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const booking = new Booking(applyItineraryTotal(req.body));
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking cancelled" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
