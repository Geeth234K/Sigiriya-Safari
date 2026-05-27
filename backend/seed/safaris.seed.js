import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Safari from "../models/Safari.js";
import { safariSeed } from "./safaris.data.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/safari_db";

async function seedSafaris() {
  try {
    await connectDB(MONGO_URI);
    await Safari.deleteMany({});
    const created = await Safari.insertMany(safariSeed);
    console.log(`Seeded ${created.length} safaris.`);
  } catch (error) {
    console.error("Failed to seed safaris:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seedSafaris();
