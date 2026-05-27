import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import Safari from "./models/Safari.js";
import { safariSeed } from "./seed/safaris.data.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/safari_db";

async function startServer() {
  try {
    await connectDB(MONGO_URI);
    const safariCount = await Safari.countDocuments();
    if (safariCount === 0) {
      await Safari.insertMany(safariSeed);
      console.log("Seeded default safari package.");
    }
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
}

startServer();
