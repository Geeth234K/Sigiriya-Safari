import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaRegClock,
  FaUsers,
  FaCompass,
  FaTag,
} from "react-icons/fa";
import { safariAPI } from "../../services/api";
import "./jeepSafariDetail.css";

const heroImage = "/images/activities/jeep-safari-hero.png";

export default function JeepSafariDetailPage() {
  const { id } = useParams();
  const [safari, setSafari] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadSafari = async () => {
      try {
        const response = await safariAPI.getById(id);
        if (!isMounted) return;
        setSafari(response.data);
        setStatus("success");
      } catch (err) {
        if (!isMounted) return;
        const message = err?.response?.data?.error || "Unable to load safari details.";
        setError(message);
        setStatus("error");
      }
    };

    loadSafari();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <section className="jeep-safari-page">
        <div className="jeep-safari-container">
          <div className="jeep-safari-status">Loading safari details...</div>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="jeep-safari-page">
        <div className="jeep-safari-container">
          <div className="jeep-safari-status error">{error}</div>
        </div>
      </section>
    );
  }

  if (!safari) {
    return (
      <section className="jeep-safari-page">
        <div className="jeep-safari-container">
          <div className="jeep-safari-status">Safari details unavailable.</div>
        </div>
      </section>
    );
  }

  const originalPrice = safari.originalPrice ?? 60;
  const discountedPrice = safari.discountedPrice ?? 45;
  const discountPercent = safari.discountPercent ?? 25;
  const savings = Math.max(0, originalPrice - discountedPrice);
  const displayGroupSize =
    typeof safari.groupSize === "string" && /4\s*(to|-)\s*6/i.test(safari.groupSize)
      ? "Up to 6 people"
      : safari.groupSize || "Up to 6 people";
  const wildlifeList = safari.wildlife?.length
    ? safari.wildlife
    : ["Elephants", "Leopards", "Deer", "Peacocks", "Monkeys"];
  const wildlifeImages = {
    elephants: ["/images/wildlife/elephants-1.png", "/images/wildlife/elephants-2.png"],
    leopards: ["/images/wildlife/leopards-1.png", "/images/wildlife/leopards-2.png"],
    deer: ["/images/wildlife/deer-1.png", "/images/wildlife/deer-2.png"],
    monkeys: ["/images/wildlife/monkeys-1.png", "/images/wildlife/monkeys-2.png"],
    peacocks: ["/images/wildlife/peacocks-1.png", "/images/wildlife/peacocks-2.png"],
  };
  const wildlifeImagePositions = {
    elephants: {
      1: "50% 60%",
    },
    monkeys: {
      1: "50% 20%",
    },
    peacocks: {
      0: "50% 15%",
      1: "80% 20%",
    },
  };
  const wildlifeEntries = wildlifeList
    .filter((animal) => !/croc/i.test(animal))
    .map((animal) => ({
      animal,
      images: wildlifeImages[animal.toLowerCase()] || [],
    }));
  const includesList = safari.includes?.length
    ? safari.includes
    : ["Full-day jeep safari", "Experienced local wildlife guide"];
  const bringList = safari.whatToBring?.length
    ? safari.whatToBring
    : ["Sunscreen", "Camera", "Water bottle", "Comfortable shoes", "Sunglasses", "Hat"];
  const bringIcons = {
    Sunscreen: "☀️",
    Camera: "📷",
    "Water bottle": "💧",
    "Comfortable shoes": "👟",
    Sunglasses: "🕶️",
    "Hat or cap": "🧢",
    Hat: "🧢",
  };

  return (
    <section className="jeep-safari-page">
      <div className="jeep-safari-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="jeep-safari-hero-overlay">
          <div className="jeep-safari-container">
            <div className="jeep-safari-hero-meta">
              <Link to="/activities" className="jeep-safari-back-link">
                <FaArrowLeft />
                Back to Activities
              </Link>
              <span className="jeep-safari-hero-pill">Most Popular</span>
            </div>
            <h1>{safari.title}</h1>
            <p>{safari.description}</p>
          </div>
        </div>
      </div>

        <div className="jeep-safari-container jeep-safari-content">
          <div className="jeep-safari-stats">
            <div className="jeep-safari-stat">
              <span className="jeep-safari-stat-icon" aria-hidden="true">
                <FaRegClock />
              </span>
              <span className="jeep-safari-stat-label">Duration</span>
              <span className="jeep-safari-stat-value">{safari.duration || "Full Day"}</span>
            </div>
            <div className="jeep-safari-stat">
              <span className="jeep-safari-stat-icon" aria-hidden="true">
                <FaUsers />
              </span>
              <span className="jeep-safari-stat-label">Group Size</span>
              <span className="jeep-safari-stat-value">
                {displayGroupSize}
              </span>
            </div>
            <div className="jeep-safari-stat">
              <span className="jeep-safari-stat-icon" aria-hidden="true">
                <FaCompass />
              </span>
              <span className="jeep-safari-stat-label">Guide</span>
              <span className="jeep-safari-stat-value">Included</span>
            </div>
            <div className="jeep-safari-stat">
              <span className="jeep-safari-stat-icon" aria-hidden="true">
                <FaTag />
              </span>
              <span className="jeep-safari-stat-label">Now</span>
              <span className="jeep-safari-stat-value price">${discountedPrice}</span>
            </div>
          </div>

        <section className="jeep-safari-section">
          <div className="jeep-safari-section-heading">
            <h2>Wildlife you may spot</h2>
            <p>Sigiriya’s reserves are rich with iconic wildlife sightings.</p>
          </div>
          <div className="jeep-safari-wildlife">
            {wildlifeEntries.map(({ animal, images }) =>
              images.length ? (
                <div key={animal} className="jeep-safari-wildlife-card">
                  <div
                    className="jeep-safari-wildlife-carousel"
                    role="region"
                    aria-label={`${animal} photos`}
                  >
                    {images.map((src, index) => {
                      const position =
                        wildlifeImagePositions[animal.toLowerCase()]?.[index] || null;
                      return (
                      <div key={`${animal}-${index}`} className="jeep-safari-wildlife-slide">
                        <img
                          src={src}
                          alt={`${animal} in the wild ${index + 1}`}
                          className="jeep-safari-wildlife-image"
                          style={position ? { objectPosition: position } : undefined}
                        />
                      </div>
                      );
                    })}
                  </div>
                  <span className="jeep-safari-wildlife-name">{animal}</span>
                </div>
              ) : (
                <span key={animal} className="jeep-safari-chip">
                  {animal}
                </span>
              )
            )}
          </div>
        </section>

        <section className="jeep-safari-section">
          <div className="jeep-safari-section-heading">
            <h2>What’s included</h2>
            <p>Everything you need for a memorable full-day safari.</p>
          </div>
          <ul className="jeep-safari-checklist">
            {includesList.map((item) => (
              <li key={item}>
                <FaCheckCircle />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="jeep-safari-section">
          <div className="jeep-safari-section-heading">
            <h2>What to bring</h2>
            <p>Pack these essentials to stay comfortable and capture every moment.</p>
          </div>
          <div className="jeep-safari-bring-grid">
            {bringList.map((item) => (
              <div key={item} className="jeep-safari-bring-card">
                <span className="jeep-safari-bring-icon" aria-hidden="true">
                  {bringIcons[item] || "•"}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="jeep-safari-price-stack">
          <div className="jeep-safari-price-card">
            <span className="jeep-safari-price-label">Package price</span>
            <div className="jeep-safari-price-body">
              <span className="jeep-safari-price-original">${originalPrice}</span>
              <span className="jeep-safari-price-current">${discountedPrice}</span>
              <span className="jeep-safari-price-pill">
                Save ${savings} - {discountPercent}% OFF
              </span>
            </div>
            <div className="jeep-safari-price-subtext">
              per group - {displayGroupSize}
            </div>
          </div>
          <Link to="/profile" className="jeep-safari-book-button">
            Book Now
          </Link>
        </section>
      </div>
    </section>
  );
}
