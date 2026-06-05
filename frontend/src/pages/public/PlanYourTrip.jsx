import { useEffect, useRef, useState } from "react";
import { bookingAPI } from "../../services/api";
import {
  DEFAULT_ITINERARY_PRICING,
  calculateItineraryTotal,
  loadItineraryPricing
} from "../../utils/itineraryPricing";
import "./planYourTrip.css";

export default function PlanYourTrip() {
  const lastAutofillUserId = useRef("");
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    startDate: "",
    endDate: "",
    guests: 1,
    interests: [],
    requests: ""
  });
  const [interestPricing, setInterestPricing] = useState(DEFAULT_ITINERARY_PRICING);

  const interests = ["Jeep Safari", "Village Tours", "Local Food"];

  useEffect(() => {
    let isMounted = true;

    const loadPricing = async () => {
      const pricing = await loadItineraryPricing();
      if (!isMounted) return;
      setInterestPricing(pricing);
    };

    loadPricing();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const syncCurrentUser = () => {
      try {
        const storedUser = localStorage.getItem("currentUser");
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const userId = parsedUser?.id || parsedUser?._id || "";

        if (!parsedUser || !userId) {
          lastAutofillUserId.current = "";
          return;
        }

        setFormData((prev) => {
          const shouldAutofill =
            userId !== lastAutofillUserId.current || !prev.fullName || !prev.email;

          if (!shouldAutofill) {
            return prev;
          }

          lastAutofillUserId.current = userId;

          return {
            ...prev,
            fullName: parsedUser.name || prev.fullName,
            email: parsedUser.email || prev.email
          };
        });
      } catch {
        lastAutofillUserId.current = "";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (interest) => {
    setFormData((prev) => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const updateGuests = (delta) => {
    setFormData((prev) => ({
      ...prev,
      guests: Math.min(12, Math.max(1, prev.guests + delta))
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!trimmedName) {
      setSubmitMessage({ type: "error", text: "Please enter your full name." });
      return;
    }

    if (!trimmedEmail || !emailValid) {
      setSubmitMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      setSubmitMessage({ type: "error", text: "Please select your trip dates." });
      return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setSubmitMessage({ type: "error", text: "End date must be after start date." });
      return;
    }

    if (formData.interests.length === 0) {
      setSubmitMessage({ type: "error", text: "Please select at least one interest." });
      return;
    }

    let userId = "";
    try {
      const storedUser = localStorage.getItem("currentUser");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      userId = parsedUser?.id || parsedUser?._id || "";
    } catch {
      userId = "";
    }

    if (!userId) {
      setSubmitMessage({ type: "error", text: "Please login to save your itinerary." });
      return;
    }

    const totalPrice = calculateItineraryTotal(formData.interests, interestPricing);

    try {
      await bookingAPI.create({
        userId,
        bookingType: "itinerary",
        fullName: trimmedName,
        email: trimmedEmail,
        whatsapp: formData.whatsapp.trim(),
        checkInDate: formData.startDate,
        checkOutDate: formData.endDate,
        guests: formData.guests,
        interests: formData.interests,
        requests: formData.requests.trim(),
        totalPrice: Number(totalPrice.toFixed(2))
      });
      setSubmitMessage({ type: "success", text: "Itinerary created successfully!" });
      window.dispatchEvent(new Event("bookingsUpdated"));
      setTimeout(() => setSubmitMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: error?.response?.data?.error || "Unable to save your itinerary."
      });
    }
  };

  const tripDays =
    formData.startDate && formData.endDate
      ? Math.max(
          0,
          Math.ceil(
            (new Date(formData.endDate) - new Date(formData.startDate)) /
              (1000 * 60 * 60 * 24)
          ) + 1
        )
      : 0;

  return (
    <section className="plan-your-trip" id="plan-your-trip">
      <div className="trip-layout">
        <div className="trip-intro">
          <p className="trip-kicker">Personalized Itinerary Builder</p>
          <h1>Plan Your Perfect Trip</h1>
          <p>
            Build a custom Sigiriya getaway in minutes. Pick your travel dates,
            guest count, and interests to generate the perfect travel plan.
          </p>
          <div className="trip-highlights">
            <div>
              <strong>{tripDays || "--"}</strong>
              <span>Trip Days</span>
            </div>
            <div>
              <strong>{formData.guests}</strong>
              <span>Guests</span>
            </div>
            <div>
              <strong>{formData.interests.length}</strong>
              <span>Interests</span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="plan-form">
          <h2>Trip Details</h2>
          {submitMessage.text && (
            <div className={`plan-message ${submitMessage.type}`}>
              {submitMessage.text}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="John Silva"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="john@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="whatsapp">WhatsApp Number (optional)</label>
            <input
              id="whatsapp"
              type="tel"
              name="whatsapp"
              placeholder="+94 77 123 4567"
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                id="endDate"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate || undefined}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guests">Number of Guests</label>
            <div className="guest-stepper">
              <button type="button" onClick={() => updateGuests(-1)} aria-label="Decrease guests">
                -
              </button>
              <span>{formData.guests}</span>
              <button type="button" onClick={() => updateGuests(1)} aria-label="Increase guests">
                +
              </button>
            </div>
          </div>

          <div className="form-group interests">
            <label>Your Interests</label>
            <div className="interest-pills">
              {interests.map((interest) => {
                const isSelected = formData.interests.includes(interest);
                return (
                  <button
                    type="button"
                    key={interest}
                    className={`interest-pill ${isSelected ? "active" : ""}`}
                    onClick={() => handleInterestChange(interest)}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="requests">Special Requests (optional)</label>
            <textarea
              id="requests"
              name="requests"
              rows="3"
              placeholder="Any dietary needs, accessibility requirements or special occasions..."
              value={formData.requests}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Create Itinerary
          </button>
        </form>
      </div>
    </section>
  );
}
