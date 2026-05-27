import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaSun, FaUtensils } from "react-icons/fa";
import { mealAPI } from "../../services/api";
import "./localFood.css";

const iconMap = {
  breakfast: FaSun,
  lunch: FaUtensils
};

const checklistItems = [
  "Freshly cooked meals using local spices and seasonal produce.",
  "Vegetarian-friendly options available on request.",
  "Homestyle flavors inspired by traditional village kitchens.",
  "Optional lunch add-ons for flexible planning."
];

const mealOrder = ["breakfast", "lunch"];

const formatPrice = (price) =>
  typeof price === "number" ? `LKR ${price.toLocaleString("en-LK")}` : "Price TBD";
const lunchGroupPriceLabel = "$8 per group";

export default function LocalFoodDetailPage() {
  const [meals, setMeals] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadMeals = async () => {
      try {
        const response = await mealAPI.getAll();
        if (!isMounted) return;
        setMeals(response.data);
        setStatus("success");
      } catch (err) {
        if (!isMounted) return;
        const message = err?.response?.data?.error || "Unable to load meal options.";
        setError(message);
        setStatus("error");
      }
    };

    loadMeals();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeMeals = useMemo(
    () =>
      meals.filter((meal) => {
        if (meal.isActive === false) return false;
        const iconKey = typeof meal?.icon === "string" ? meal.icon.trim().toLowerCase() : "";
        const nameKey = typeof meal?.name === "string" ? meal.name.trim().toLowerCase() : "";
        return iconKey !== "dinner" && nameKey !== "dinner";
      }),
    [meals]
  );
  const sortedMeals = useMemo(() => {
    const lookup = new Map(mealOrder.map((key, index) => [key, index]));
    return [...activeMeals].sort((a, b) => {
      const aKey = typeof a?.icon === "string" ? a.icon.toLowerCase() : "";
      const bKey = typeof b?.icon === "string" ? b.icon.toLowerCase() : "";
      return (lookup.get(aKey) ?? 99) - (lookup.get(bKey) ?? 99);
    });
  }, [activeMeals]);

  return (
    <section className="local-food-page">
      <div className="local-food-hero">
        <div className="local-food-hero-overlay">
          <div className="local-food-hero-content local-food-container">
            <Link to="/activities" className="local-food-back-link">
              <FaArrowLeft />
              Back to Activities
            </Link>
            <span className="local-food-tag">Food</span>
            <h1>Local Food</h1>
            <p>
              Savor 100% traditional Sri Lankan cuisine cooked fresh with local spices and
              ingredients.
            </p>
          </div>
        </div>
      </div>

      <div className="local-food-container local-food-content">
        <p className="local-food-summary">
          Every meal showcases the authentic flavors of Sigiriya, from coconut sambol and hoppers
          to slow-cooked curries and seasonal sides.
        </p>

        <div className="local-food-notice">
          <strong>Breakfast is complimentary</strong> with every room booking. Lunch is an optional
          add-on you can include during booking.
        </div>

        {status === "loading" && <div className="local-food-status">Loading meals...</div>}
        {status === "error" && <div className="local-food-status error">{error}</div>}
        {status === "success" && sortedMeals.length === 0 && (
          <div className="local-food-status">No meals available yet.</div>
        )}

        {status === "success" && sortedMeals.length > 0 && (
          <section className="local-food-section">
            <div className="local-food-section-heading">
              <h2>Meal Options</h2>
              <p>Choose the meals that fit your itinerary.</p>
            </div>
            <div className="meal-grid">
              {sortedMeals.map((meal) => {
                const iconKey = typeof meal?.icon === "string" ? meal.icon.trim().toLowerCase() : "";
                const nameKey = typeof meal?.name === "string" ? meal.name.trim().toLowerCase() : "";
                const Icon = iconMap[iconKey] || FaUtensils;
                const isBreakfast = iconKey === "breakfast" || nameKey === "breakfast";
                const isLunch = iconKey === "lunch" || nameKey === "lunch";
                const priceLabel = meal.isIncluded
                  ? "Free"
                  : isLunch
                    ? lunchGroupPriceLabel
                    : formatPrice(meal.price);
                return (
                  <article
                    key={meal._id || meal.name}
                    className={`meal-card${meal.isIncluded ? " meal-card--included" : ""}${
                      isBreakfast ? " meal-card--breakfast" : ""
                    }${isLunch ? " meal-card--lunch" : ""}`}
                  >
                    <div className="meal-card-top">
                      <span className="meal-card-icon">
                        <Icon size={20} />
                      </span>
                      {meal.isIncluded ? (
                        <span className="meal-badge">Free</span>
                      ) : (
                        <span className="meal-price">{priceLabel}</span>
                      )}
                    </div>
                    <h3>{meal.name}</h3>
                    <p>{meal.description}</p>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        <section className="local-food-section">
          <div className="local-food-section-heading">
            <h2>What to Expect</h2>
            <p>Comforting flavors and warm hospitality at every meal.</p>
          </div>
          <ul className="local-food-checklist">
            {checklistItems.map((item) => (
              <li key={item}>
                <FaCheckCircle />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="local-food-cta">
          <Link to="/profile" className="local-food-cta-button">
            Add Meals to Booking
          </Link>
        </div>
      </div>
    </section>
  );
}
