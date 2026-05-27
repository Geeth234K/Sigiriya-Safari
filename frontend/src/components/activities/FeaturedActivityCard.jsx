import { Link } from "react-router-dom";
import "./featuredActivityCard.css";

const fallbackImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80";

export default function FeaturedActivityCard({
  title,
  description,
  tag,
  icon: Icon,
  image,
  link,
  badge,
  accentColor
}) {
  const resolvedTitle = title || "Signature Experience";
  const resolvedDescription =
    description || "Discover a memorable adventure curated by local experts.";
  const resolvedTag = tag || "Experience";
  const resolvedImage = image || fallbackImage;
  const resolvedAccent = accentColor || "#1c7c54";

  return (
    <article className="featured-activity-card">
      <div
        className="featured-activity-card-media"
        style={{ backgroundImage: `url(${resolvedImage})` }}
      >
        <div className="featured-activity-card-media-overlay">
          <div className="featured-activity-card-media-top">
            {badge && <span className="featured-activity-card-badge">{badge}</span>}
          </div>
          <div className="featured-activity-card-media-bottom">
            <div
              className="featured-activity-card-icon"
              style={{ backgroundColor: resolvedAccent }}
            >
              {Icon ? <Icon size={22} /> : null}
            </div>
            <span className="featured-activity-card-tag">{resolvedTag}</span>
          </div>
        </div>
      </div>
      <div className="featured-activity-card-body">
        <h3>{resolvedTitle}</h3>
        <p>{resolvedDescription}</p>
        <Link className="featured-activity-card-button" to={link}>
          Learn More
        </Link>
      </div>
    </article>
  );
}
