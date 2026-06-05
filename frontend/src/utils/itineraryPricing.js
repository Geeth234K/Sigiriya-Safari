import { activityAPI, mealAPI, safariAPI } from "../services/api";

export const DEFAULT_ITINERARY_PRICING = {
  jeepSafari: 45,
  villageTours: 8,
  localFood: 8
};

export const ITINERARY_INTERESTS = ["Jeep Safari", "Village Tours", "Local Food"];

const normalizeText = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

const parsePrice = (value) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const numeric = Number(value.replace(/[^0-9.]/g, ""));
    return Number.isFinite(numeric) ? numeric : 0;
  }
  return 0;
};

const interestKeyMap = {
  "jeep safari": "jeepSafari",
  "village tours": "villageTours",
  "local food": "localFood"
};

export const getInterestPrice = (interest, pricing = DEFAULT_ITINERARY_PRICING) => {
  const key = interestKeyMap[normalizeText(interest)];
  if (!key) return 0;
  const value = Number(pricing?.[key] ?? 0);
  return Number.isFinite(value) ? value : 0;
};

export const calculateItineraryTotal = (interests = [], pricing = DEFAULT_ITINERARY_PRICING) => {
  if (typeof interests === "string") {
    const parsed = interests
      .split(",")
      .map((interest) => interest.trim())
      .filter(Boolean);
    return parsed.reduce((sum, interest) => sum + getInterestPrice(interest, pricing), 0);
  }
  if (!Array.isArray(interests) || interests.length === 0) return 0;
  return interests.reduce((sum, interest) => sum + getInterestPrice(interest, pricing), 0);
};

const fetchItineraryPricing = async () => {
  const [safariResponse, activityResponse, mealResponse] = await Promise.all([
    safariAPI.getAll(),
    activityAPI.getAll(),
    mealAPI.getAll()
  ]);

  const jeepSafari = safariResponse.data?.find(
    (item) => normalizeText(item?.title) === "jeep safari"
  );
  const villageTours = activityResponse.data?.find(
    (item) => normalizeText(item?.title) === "village tours"
  );
  const lunchMeal = mealResponse.data?.find((meal) => {
    const iconKey = normalizeText(meal?.icon);
    const nameKey = normalizeText(meal?.name);
    return iconKey === "lunch" || nameKey === "lunch";
  });

  const safariPrice = parsePrice(jeepSafari?.discountedPrice) || DEFAULT_ITINERARY_PRICING.jeepSafari;
  const villagePrice = parsePrice(villageTours?.price) || DEFAULT_ITINERARY_PRICING.villageTours;
  const mealPriceRaw = lunchMeal?.isIncluded ? 0 : parsePrice(lunchMeal?.price);
  const mealPrice =
    mealPriceRaw > 0 ? mealPriceRaw : DEFAULT_ITINERARY_PRICING.localFood;

  return {
    jeepSafari: safariPrice,
    villageTours: villagePrice,
    localFood: mealPrice
  };
};

export const loadItineraryPricing = async () => {
  try {
    return await fetchItineraryPricing();
  } catch (error) {
    console.error("Failed to load itinerary pricing.", error);
    return DEFAULT_ITINERARY_PRICING;
  }
};
