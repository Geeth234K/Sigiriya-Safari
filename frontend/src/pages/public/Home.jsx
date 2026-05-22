import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import heroImage from "../../assets/homepage-background.png";

const stats = [
  { value: "1200+", label: "Trips Completed", icon: "🧭" },
  { value: "4.9/5", label: "Guest Rating", icon: "⭐" },
  { value: "24/7", label: "Trip Assistance", icon: "🎧" }
];

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (!isVideoOpen) return undefined;

    const onEsc = (event) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [isVideoOpen]);

  return (
    <>
      <section className="home">
        <div className="hero-media" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-kicker">Luxury Jungle Safaris · Sri Lanka</p>
          <h1>Explore Sigiriya Like Never Before</h1>
          <p className="hero-subtitle">
            Experience unforgettable safari tours, wildlife adventures, and breathtaking landscapes around Sigiriya.
          </p>
          <div className="hero-actions">
            <Link to="/activities" className="cta-btn primary">
              <span>🚙</span> Explore Safari Tours
            </Link>
            <button type="button" className="cta-btn secondary" onClick={() => setIsVideoOpen(true)}>
              <span>▶</span> Watch Video
            </button>
          </div>
          <div className="hero-stats" aria-label="Safari Highlights">
            {stats.map((stat) => (
              <article key={stat.label} className="stat-item">
                <div className="stat-icon" aria-hidden="true">
                  {stat.icon}
                </div>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {isVideoOpen && (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label="Safari teaser video">
          <button
            type="button"
            className="video-modal-backdrop"
            onClick={() => setIsVideoOpen(false)}
            aria-label="Close video"
          />
          <div className="video-modal-content">
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video"
            >
              ✕
            </button>
            <iframe
              title="Safari teaser"
              src="https://www.youtube.com/embed/Scxs7L0vhZ4?autoplay=1&rel=0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
