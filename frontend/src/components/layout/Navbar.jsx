import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Auth from "../auth/Auth";
import "./navbar.css";

export default function Navbar() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const syncCurrentUser = () => {
      try {
        const stored = localStorage.getItem("currentUser");
        setCurrentUser(stored ? JSON.parse(stored) : null);
      } catch {
        setCurrentUser(null);
      }
    };

    syncCurrentUser();
    window.addEventListener("storage", syncCurrentUser);
    window.addEventListener("currentUserChanged", syncCurrentUser);

    return () => {
      window.removeEventListener("storage", syncCurrentUser);
      window.removeEventListener("currentUserChanged", syncCurrentUser);
    };
  }, []);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowAuth(true);
    setIsProfileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" aria-label="Sigiriya Safari home">
            <span className="navbar-logo-icon">🦁</span>
            <span>Sigiriya Safari</span>
          </Link>
          <ul className="nav-menu">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                About Sigiriya
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/activities" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                What to Do
              </NavLink>
            </li>
            {currentUser ? (
              <li className="nav-item">
                <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                  Profile
                </NavLink>
              </li>
            ) : (
              <li className={`nav-item profile-dropdown ${isProfileMenuOpen ? "open" : ""}`} ref={profileMenuRef}>
                <button
                  type="button"
                  className="nav-link profile-trigger"
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  aria-expanded={isProfileMenuOpen}
                >
                  Profile
                </button>
                <div className="profile-dropdown-menu">
                  <button type="button" className="profile-dropdown-item" onClick={() => openAuth("login")}>
                    Login
                  </button>
                  <button type="button" className="profile-dropdown-item" onClick={() => openAuth("signup")}>
                    Sign Up
                  </button>
                </div>
              </li>
            )}
            <li className="nav-item">
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {showAuth && (
        <Auth
          defaultMode={authMode}
          onLogin={(loggedUser) => {
            setCurrentUser(loggedUser);
            setShowAuth(false);
          }}
          onClose={() => setShowAuth(false)}
        />
      )}
    </>
  );
}
