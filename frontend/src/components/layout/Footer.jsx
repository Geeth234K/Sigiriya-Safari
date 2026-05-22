import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Sigiriya Safari</h4>
          <p>Curated safari experiences, local stays, and seamless trip planning in one place.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Sigiriya</Link></li>
            <li><Link to="/activities">Activities</Link></li>
            <li><Link to="/profile">Plan Your Trip</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@sigiriyasafari.com</p>
          <p>Phone: +94-123-456-789</p>
          <div className="footer-socials" aria-label="social links">
            <a href="#" aria-label="Facebook">Fb</a>
            <a href="#" aria-label="Instagram">Ig</a>
            <a href="#" aria-label="YouTube">Yt</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
