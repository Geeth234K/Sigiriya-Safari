import { Link } from "react-router-dom";
import { GiLion } from "react-icons/gi";
import "./jeepSafariCard.css";

const safariImage = "/images/activities/jeep-safari-hero.png";

export default function JeepSafariCard({ safari }) {
  if (!safari) return null;

  const originalPrice = safari.originalPrice ?? 60;
  const discountedPrice = safari.discountedPrice ?? 45;
  const discountPercent = safari.discountPercent ?? 25;
  const savings = Math.max(0, originalPrice - discountedPrice);
  const description =
    safari.description ||
    "Full-day jeep safari with an experienced local wildlife guide and unforgettable sightings.";

  return (
    <article className="jeep-safari-card">
      <div className="jeep-safari-card-media" style={{ backgroundImage: `url(${safariImage})` }}>
        <div className="jeep-safari-card-media-overlay">
          <div className="jeep-safari-card-media-top">
            <span className="jeep-safari-card-popular">Most Popular</span>
            <span className="jeep-safari-card-discount-badge">{discountPercent}% OFF</span>
          </div>
          <div className="jeep-safari-card-media-bottom">
            <div className="jeep-safari-card-icon">
              <GiLion size={22} />
            </div>
            <span className="jeep-safari-card-tag">Adventure</span>
          </div>
        </div>
      </div>
      <div className="jeep-safari-card-body">
        <h3>{safari.title}</h3>
        <p>{description}</p>
        <div className="jeep-safari-card-pricing">
          <span className="jeep-safari-card-original">${originalPrice}</span>
          <span className="jeep-safari-card-current">${discountedPrice}</span>
          <span className="jeep-safari-card-per">per group</span>
        </div>
        <div className="jeep-safari-card-meta">
          <span className="jeep-safari-card-save">Save ${savings}</span>
          <span className="jeep-safari-card-duration">Full Day</span>
        </div>
        <Link className="jeep-safari-card-button" to={`/safaris/${safari._id}`}>
          Learn More
        </Link>
      </div>
    </article>
  );
}
