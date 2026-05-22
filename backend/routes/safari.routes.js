import { Router } from "express";
import Safari from "../models/Safari.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const safaris = await Safari.find();
    res.json(safaris);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const safari = await Safari.findById(req.params.id);
    if (!safari) return res.status(404).json({ error: "Safari not found" });
    res.json(safari);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const safari = new Safari(req.body);
    await safari.save();
    res.status(201).json(safari);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const safari = await Safari.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!safari) return res.status(404).json({ error: "Safari not found" });
    res.json(safari);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const safari = await Safari.findByIdAndDelete(req.params.id);
    if (!safari) return res.status(404).json({ error: "Safari not found" });
    res.json({ message: "Safari deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
