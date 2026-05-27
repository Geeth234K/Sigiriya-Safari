import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Activity from "../models/Activity.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/safari_db";

const activities = [
  {
    title: "Jeep Safari",
    shortDescription: "Thrilling wildlife safari through scenic trails.",
    description:
      "Embark on an exciting jeep safari across Sigiriya’s wilderness. Spot elephants, deer, and tropical birds while an experienced guide shares stories about the local ecosystem and conservation efforts.",
    tag: "Adventure",
    accentColor: "#1c7c54",
    icon: "jeep"
  },
  {
    title: "Village Tours",
    shortDescription:
      "A full-day cultural immersion combining rustic charm, local hospitality, and scenic rides.",
    description:
      "Spend a full day discovering the rhythms of village life in Sigiriya. Enjoy warm welcomes, explore paddy fields, and savor traditional snacks while you experience transport and activities that locals have cherished for generations.",
    tag: "Culture",
    accentColor: "#8b5cf6",
    icon: "village",
    heroImage:
      "/images/activities/village-tour-hero.png",
    heroImageAlt: "Sigiriya rock rising above the jungle canopy",
    duration: "Full Day",
    price: "8$ per group",
    groupInfo: "Private group bookings available for families and friends.",
    includedActivities: [
      {
        title: "Cart Ride",
        description: "Ride through village trails on a traditional wooden cart.",
        image: "/images/activities/cart-ride.png",
        imageAlt: "Traditional cart ride through the countryside"
      },
      {
        title: "Boat Ride",
        description: "Glide across tranquil lakes surrounded by paddy fields.",
        image: "/images/activities/boat-ride.png",
        imageAlt: "Boat ride with guests on a lake"
      }
    ]
  },
  {
    title: "Local Food",
    shortDescription: "Taste authentic traditional cuisine.",
    description:
      "Savor freshly prepared rice and curry, seasonal fruit, and sweet treats made with local ingredients. Each dish highlights Sri Lanka’s vibrant flavors and time-honored recipes.",
    tag: "Cuisine",
    accentColor: "#f59e0b",
    icon: "food"
  }
];

async function seedActivities() {
  try {
    await connectDB(MONGO_URI);
    await Activity.deleteMany({});
    const created = await Activity.insertMany(activities);
    console.log(`Seeded ${created.length} activities.`);
  } catch (error) {
    console.error("Failed to seed activities:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seedActivities();
