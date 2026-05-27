import { Router } from "express";
import Meal from "../models/Meal.js";

const router = Router();

const defaultMeals = [
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

const normalizeName = value => (typeof value === "string" ? value.trim().toLowerCase() : "");

const ensureDefaultMeals = async () => {
  const existing = await Meal.find();
  if (existing.length === 0) {
    await Meal.insertMany(defaultMeals);
    return;
  }
  const existingNames = new Set(existing.map(meal => normalizeName(meal.name)));
  const missingMeals = defaultMeals.filter(meal => !existingNames.has(normalizeName(meal.name)));
  if (missingMeals.length > 0) {
    await Meal.insertMany(missingMeals);
  }
};

router.get("/", async (req, res) => {
  try {
    await ensureDefaultMeals();
    const meals = await Meal.find();
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ error: "Meal not found" });
    res.json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const meal = new Meal(req.body);
    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!meal) return res.status(404).json({ error: "Meal not found" });
    res.json(meal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) return res.status(404).json({ error: "Meal not found" });
    res.json({ message: "Meal deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
