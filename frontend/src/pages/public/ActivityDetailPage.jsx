import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { activityAPI } from "../../services/api";
import "./activities.css";

export default function ActivityDetailPage() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadActivity = async () => {
      try {
        const response = await activityAPI.getById(id);
        if (!isMounted) return;
        setActivity(response.data);
        setStatus("success");
      } catch (err) {
        if (!isMounted) return;
        const message = err?.response?.data?.error || "Unable to load this activity.";
        setError(message);
        setStatus("error");
      }
    };

    loadActivity();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const includedActivities = activity?.includedActivities ?? [];
  const heroImage =
    activity?.heroImage ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80";
  const isVillageTour =
    typeof activity?.title === "string" && activity.title.trim().toLowerCase() === "village tours";

  return (
    <section className={`activity-detail-page${isVillageTour ? " activity-detail-page--village" : ""}`}>
      {status === "loading" && <div className="activities-status">Loading activity...</div>}
      {status === "error" && <div className="activities-status error">{error}</div>}

      {status === "success" && activity && (
        <>
          <div className="activity-hero" style={{ backgroundImage: `url(${heroImage})` }}>
            <div className="activity-hero-overlay">
              <div className="activities-container activity-hero-content">
                <span className="activity-hero-tag">{activity.tag}</span>
                <h1>{activity.title}</h1>
              </div>
            </div>
          </div>

          <div className="activities-container activity-detail-content">
            <p className="activity-summary">{activity.shortDescription}</p>
            <p className="activity-detail-description">{activity.description}</p>

            {includedActivities.length > 0 && (
              <section className="activity-section">
                <div className="activity-section-heading">
                  <h2>Included Activities</h2>
                  <p>Two immersive experiences that showcase village life.</p>
                </div>
                <div className="included-grid">
                  {includedActivities.map((included) => {
                    const normalizedTitle =
                      typeof included?.title === "string" ? included.title.trim().toLowerCase() : "";
                    const isCartRide = normalizedTitle === "cart ride";
                    const isBoatRide = normalizedTitle === "boat ride";
                    return (
                      <article key={included.title} className="included-card">
                        <img
                          className={`included-card-image${isCartRide ? " cart-ride-image" : ""}${
                            isBoatRide ? " boat-ride-image" : ""
                          }`}
                          src={included.image}
                          alt={included.imageAlt || included.title}
                        />
                        <div className="included-card-body">
                          <h3>{included.title}</h3>
                          <p>{included.description}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            <section className="activity-section">
              <div className="activity-section-heading">
                <h2>Package Details</h2>
                <p>Everything you need to plan your day.</p>
              </div>
              <div className="package-grid">
                <div className="package-card">
                  <span>Duration</span>
                  <strong>{activity.duration || "Full Day"}</strong>
                </div>
                <div className="package-card">
                  <span>Price</span>
                  <strong>{activity.price || "8$ per group"}</strong>
                </div>
                <div className="package-card">
                  <span>Group Booking</span>
                  <strong>{activity.groupInfo || "Private group bookings available."}</strong>
                </div>
              </div>
            </section>

            <div className="activity-cta">
              <Link to="/activities" className="activity-back-link">
                <FaArrowLeft />
                Back to Activities
              </Link>
              <Link to={isVillageTour ? "/profile" : "/contact"} className="book-now-button">
                Book Now
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
