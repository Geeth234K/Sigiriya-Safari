import { Router } from "express";
import Activity from "../models/Activity.js";

const router = Router();

const blockedTitles = ["hiking", "cart riding", "cart ride", "photography"];
const normalizeTitle = value => (typeof value === "string" ? value.trim().toLowerCase() : "");
const previousVillageHeroImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80";
const previousVillageHeroImageId = "photo-1500530855697-b586d89ba3ee";
const previousVillageHeroImageAlt = "Sri Lankan village landscape with lush greenery";
const previousVillagePrice = "10,000 LKR per group";
const updatedVillagePrice = "8$ per group";
const villageDefaults = {
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
};

const applyVillageDefaults = activity => {
  if (normalizeTitle(activity.title) !== "village tours") return false;
  let updated = false;
  const shouldUpdateHeroImage =
    !activity.heroImage ||
    activity.heroImage === previousVillageHeroImage ||
    (typeof activity.heroImage === "string" &&
      activity.heroImage.includes(previousVillageHeroImageId));
  if (shouldUpdateHeroImage) {
    activity.heroImage = villageDefaults.heroImage;
    updated = true;
  }
  if (!activity.shortDescription) {
    activity.shortDescription = villageDefaults.shortDescription;
    updated = true;
  }
  if (!activity.description) {
    activity.description = villageDefaults.description;
    updated = true;
  }
  if (!activity.tag) {
    activity.tag = villageDefaults.tag;
    updated = true;
  }
  if (!activity.accentColor) {
    activity.accentColor = villageDefaults.accentColor;
    updated = true;
  }
  if (!activity.icon) {
    activity.icon = villageDefaults.icon;
    updated = true;
  }
  const shouldUpdateHeroAlt =
    !activity.heroImageAlt ||
    activity.heroImageAlt === previousVillageHeroImageAlt ||
    shouldUpdateHeroImage;
  if (shouldUpdateHeroAlt) {
    activity.heroImageAlt = villageDefaults.heroImageAlt;
    updated = true;
  }
  if (!activity.duration) {
    activity.duration = villageDefaults.duration;
    updated = true;
  }
  const shouldUpdatePrice =
    !activity.price ||
    activity.price === previousVillagePrice ||
    activity.price === "8$";
  if (shouldUpdatePrice) {
    activity.price = updatedVillagePrice;
    updated = true;
  }
  if (!activity.groupInfo) {
    activity.groupInfo = villageDefaults.groupInfo;
    updated = true;
  }
  const currentIncluded = Array.isArray(activity.includedActivities)
    ? activity.includedActivities
    : [];
  let includedUpdated = false;
  const seenIncluded = new Set();
  const uniqueIncluded = [];

  currentIncluded.forEach(item => {
    const key = normalizeTitle(item?.title);
    if (!key || seenIncluded.has(key)) {
      includedUpdated = true;
      return;
    }
    if (key === "cart ride" && item?.image !== villageDefaults.includedActivities[0].image) {
      item.image = villageDefaults.includedActivities[0].image;
      item.imageAlt = villageDefaults.includedActivities[0].imageAlt;
      includedUpdated = true;
    }
    if (key === "boat ride" && item?.image !== villageDefaults.includedActivities[1].image) {
      item.image = villageDefaults.includedActivities[1].image;
      item.imageAlt = villageDefaults.includedActivities[1].imageAlt;
      includedUpdated = true;
    }
    seenIncluded.add(key);
    uniqueIncluded.push(item);
  });

  villageDefaults.includedActivities.forEach(defaultItem => {
    const key = normalizeTitle(defaultItem.title);
    if (!seenIncluded.has(key)) {
      uniqueIncluded.push(defaultItem);
      seenIncluded.add(key);
      includedUpdated = true;
    }
  });

  if (includedUpdated || !Array.isArray(activity.includedActivities)) {
    activity.includedActivities = uniqueIncluded;
    updated = true;
  }
  return updated;
};

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    const seenTitles = new Set();
    const removeIds = [];
    const uniqueActivities = [];
    const savePromises = [];

    activities.forEach(activity => {
      const normalized = normalizeTitle(activity.title);
      if (blockedTitles.includes(normalized)) {
        removeIds.push(activity._id);
        return;
      }
      if (seenTitles.has(normalized)) {
        removeIds.push(activity._id);
        return;
      }
      seenTitles.add(normalized);
      if (applyVillageDefaults(activity)) {
        savePromises.push(activity.save());
      }
      uniqueActivities.push(activity);
    });

    if (removeIds.length > 0) {
      await Activity.deleteMany({ _id: { $in: removeIds } });
    }
    if (savePromises.length > 0) {
      await Promise.all(savePromises);
    }

    res.json(uniqueActivities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity || blockedTitles.includes(normalizeTitle(activity.title))) {
      return res.status(404).json({ error: "Activity not found" });
    }
    if (applyVillageDefaults(activity)) {
      await activity.save();
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!activity) return res.status(404).json({ error: "Activity not found" });
    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ error: "Activity not found" });
    res.json({ message: "Activity deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
