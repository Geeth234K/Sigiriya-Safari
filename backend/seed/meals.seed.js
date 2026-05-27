import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Meal from "../models/Meal.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/safari_db";

const meals = [
  {
    name: "Breakfast",
    description: "Freshly cooked hoppers, coconut sambol, and seasonal fruit to start the day.",
    icon: "breakfast",
    price: 0,
    isIncluded: true,
    isActive: true
  },
  {
    name: "Lunch",
    description: "A hearty rice and curry spread with garden vegetables and local spices.",
    icon: "lunch",
    isIncluded: false,
    isActive: true
  }
];

async function seedMeals() {
  try {
    await connectDB(MONGO_URI);
    await Meal.deleteMany({});
    const created = await Meal.insertMany(meals);
    console.log(`Seeded ${created.length} meals.`);
  } catch (error) {
    console.error("Failed to seed meals:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seedMeals();
