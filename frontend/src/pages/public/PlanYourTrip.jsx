import { useState } from "react";
import "./planYourTrip.css";

export default function PlanYourTrip() {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    guests: "1",
    interests: []
  });

  const interests = ["Safari", "Adventure", "Culture", "Beach", "Wildlife"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInterestChange = (interest) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: newInterests });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Trip planned:", formData);
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
    <section className="plan-your-trip">
      <div className="trip-layout">
        <div className="trip-intro">
          <p className="trip-kicker">Personalized Itinerary Builder</p>
          <h1>Plan Your Trip</h1>
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

          <div className="date-row">
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
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group interests">
            <label>Your Interests</label>
            <div className="interests-grid">
              {interests.map((interest) => {
                const isSelected = formData.interests.includes(interest);
                return (
                  <label
                    key={interest}
                    className={`interest-checkbox ${isSelected ? "active" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleInterestChange(interest)}
                    />
                    {interest}
                  </label>
                );
              })}
            </div>
            <p className="interest-note">
              {formData.interests.length
                ? `Selected: ${formData.interests.join(", ")}`
                : "Select one or more interests to personalize your itinerary."}
            </p>
          </div>

          <button type="submit" className="submit-btn">
            Create Itinerary
          </button>
        </form>
      </div>
    </section>
  );
}
