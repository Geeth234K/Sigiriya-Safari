import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import safariRoutes from "./routes/safari.routes.js";
import roomRoutes from "./routes/room.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import userRoutes from "./routes/user.routes.js";
import aboutRoutes from "./routes/about.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/safaris", safariRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/about", aboutRoutes);

export default app;
