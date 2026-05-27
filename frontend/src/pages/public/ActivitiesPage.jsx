import { useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { GiBinoculars, GiJeep, GiVillage } from "react-icons/gi";
import FeaturedActivityCard from "../../components/activities/FeaturedActivityCard";
import LocalFoodCard from "../../components/activities/LocalFoodCard";
import JeepSafariCard from "../../components/activities/JeepSafariCard";
import { activityAPI, safariAPI } from "../../services/api";
import "./activities.css";

const iconMap = {
  jeep: GiJeep,
  village: GiVillage,
  food: FaUtensils
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [jeepSafari, setJeepSafari] = useState(null);
  const [status, setStatus] = useState("loading");
  const [safariStatus, setSafariStatus] = useState("loading");
  const [error, setError] = useState("");
  const [safariError, setSafariError] = useState("");
  const normalizeTitle = (value) =>
    typeof value === "string" ? value.trim().toLowerCase() : "";
  const localFoodActivity = activities.find(
    (activity) => normalizeTitle(activity.title) === "local food"
  );
  const displayActivities = activities.filter(
    (activity) => {
      const title = normalizeTitle(activity.title);
      return title !== "local food" && title !== "jeep safari";
    }
  );

  useEffect(() => {
    let isMounted = true;

    const loadActivities = async () => {
      try {
        const response = await activityAPI.getAll();
        if (!isMounted) return;
        setActivities(response.data);
        setStatus("success");
      } catch (err) {
        if (!isMounted) return;
        const message = err?.response?.data?.error || "Unable to load activities right now.";
        setError(message);
        setStatus("error");
      }
    };

    const loadSafaris = async () => {
      try {
        const response = await safariAPI.getAll();
        if (!isMounted) return;
        const safari = response.data.find(
          (item) => normalizeTitle(item.title) === "jeep safari"
        );
        if (!safari) {
          setSafariError("Jeep Safari package is not available right now.");
          setSafariStatus("error");
          return;
        }
        setJeepSafari(safari);
        setSafariStatus("success");
      } catch (err) {
        if (!isMounted) return;
        const message = err?.response?.data?.error || "Unable to load safari details.";
        setSafariError(message);
        setSafariStatus("error");
      }
    };

    loadActivities();
    loadSafaris();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="activities-page">
      <div className="activities-container">
        <header className="activities-hero">
          <h1>What to Do</h1>
          <p>Choose an experience tailored for adventure, culture, or cuisine.</p>
        </header>

        {status === "loading" && <div className="activities-status">Loading activities...</div>}
        {status === "error" && <div className="activities-status error">{error}</div>}
        {safariStatus === "error" && <div className="activities-status error">{safariError}</div>}

        {status === "success" && activities.length === 0 && (
          <div className="activities-status">No activities available yet.</div>
        )}

        {status === "success" && (
          <div className="activities-grid">
            {safariStatus === "success" && <JeepSafariCard safari={jeepSafari} />}
            {displayActivities.map((activity) => {
              const Icon = iconMap[activity.icon] || GiBinoculars;
              const titleKey = normalizeTitle(activity.title);
              const badge = titleKey === "village tours" ? "Cultural Favorite" : "";
              return (
                <FeaturedActivityCard
                  key={activity._id}
                  title={activity.title}
                  description={activity.shortDescription}
                  tag={activity.tag}
                  icon={Icon}
                  image={activity.heroImage}
                  link={`/activities/${activity._id}`}
                  badge={badge}
                  accentColor={activity.accentColor}
                />
              );
            })}
            <LocalFoodCard activity={localFoodActivity} />
          </div>
        )}
      </div>
    </section>
  );
}
