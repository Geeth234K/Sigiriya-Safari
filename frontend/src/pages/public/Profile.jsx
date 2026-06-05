import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI, bookingAPI } from "../../services/api";
import {
  DEFAULT_ITINERARY_PRICING,
  calculateItineraryTotal,
  loadItineraryPricing
} from "../../utils/itineraryPricing";
import PlanYourTrip from "./PlanYourTrip";
import "./profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [resolvedUserId, setResolvedUserId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [bookingMessage, setBookingMessage] = useState({ type: "", text: "" });
  const [itineraryPricing, setItineraryPricing] = useState(DEFAULT_ITINERARY_PRICING);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeProfileData();
  }, []);

  useEffect(() => {
    if (resolvedUserId) {
      fetchUserBookings(resolvedUserId);
    } else {
      setBookings([]);
    }
  }, [resolvedUserId]);

  useEffect(() => {
    let isMounted = true;
    const loadPricing = async () => {
      const pricing = await loadItineraryPricing();
      if (!isMounted) return;
      setItineraryPricing(pricing);
    };
    loadPricing();
    return () => {
      isMounted = false;
    };
  }, []);

  const initializeProfileData = async () => {
    setLoading(true);
    try {
      const storedUserRaw = localStorage.getItem("currentUser");
      if (!storedUserRaw) {
        setMessage("Please login to view your profile.");
        setUser(null);
        setResolvedUserId("");
        return;
      }

      let targetId = "";
      try {
        const parsedUser = JSON.parse(storedUserRaw);
        targetId = parsedUser?.id || parsedUser?._id || "";
      } catch {
        setMessage("Please login again to view your profile.");
        setUser(null);
        setResolvedUserId("");
        return;
      }

      if (!targetId) {
        setMessage("Please login again to view your profile.");
        setUser(null);
        setResolvedUserId("");
        return;
      }

      setResolvedUserId(targetId);
      await fetchUserProfile(targetId);
      setMessage("");
    } catch (error) {
      setMessage("Failed to load your profile");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async (userId) => {
    const response = await userAPI.getProfile(userId);
    setUser(response.data);
    setFormData({
      name: response.data.name,
      email: response.data.email,
      password: ""
    });
  };

  const fetchUserBookings = async (userId) => {
    try {
      const response = await bookingAPI.getAll();
      const userBookings = response.data.filter(
        (b) => String(b.userId?._id || b.userId) === String(userId)
      );
      setBookings(userBookings);
    } catch (error) {
      console.error("Failed to load bookings", error);
    }
  };

  useEffect(() => {
    if (!resolvedUserId) return;
    const handleBookingsUpdated = () => fetchUserBookings(resolvedUserId);
    window.addEventListener("bookingsUpdated", handleBookingsUpdated);
    return () => window.removeEventListener("bookingsUpdated", handleBookingsUpdated);
  }, [resolvedUserId]);

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString();
  };

  const getBookingTotal = (booking) => {
    const total = Number(booking.totalPrice);
    if (!Number.isNaN(total) && total > 0) {
      return total;
    }
    if (booking.bookingType === "itinerary" || booking.interests?.length) {
      return calculateItineraryTotal(booking.interests || [], itineraryPricing);
    }
    if (booking.roomId?.pricePerNight && booking.checkInDate && booking.checkOutDate) {
      const start = new Date(booking.checkInDate);
      const end = new Date(booking.checkOutDate);
      const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
      return booking.roomId.pricePerNight * nights;
    }
    if (booking.safariId?.discountedPrice) {
      return booking.safariId.discountedPrice;
    }
    return 0;
  };

  const getTripDays = (booking) => {
    if (!booking.checkInDate || !booking.checkOutDate) return 0;
    const start = new Date(booking.checkInDate);
    const end = new Date(booking.checkOutDate);
    return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  };

  const getBookingTitle = (booking) => {
    if (booking.interests?.length) {
      return booking.interests.join(" + ");
    }
    const safariTitle = booking.safariId?.title;
    const roomName = booking.roomId?.name;
    return [safariTitle, roomName].filter(Boolean).join(" + ") || "Sigiriya Safari Booking";
  };

  const getBookingRef = (booking, index) => {
    if (booking.bookingId) return booking.bookingId;
    const year = booking.createdAt ? new Date(booking.createdAt).getFullYear() : new Date().getFullYear();
    return `SS-${year}-${String(index + 1).padStart(4, "0")}`;
  };

  const formatCurrency = (value, currency = "LKR") => {
    const amount = Number(value || 0).toFixed(2);
    if (currency === "$") return `$${amount}`;
    return `LKR ${amount}`;
  };

  const getBookingCurrency = (booking) => {
    if (booking.bookingType === "itinerary" || booking.interests?.length || booking.safariId) {
      return "$";
    }
    return "LKR";
  };

  const bookingSummary = useMemo(() => {
    const totalBookings = bookings.length;
    const upcomingTrips = bookings.filter((booking) => {
      if (!booking.checkInDate) return false;
      return new Date(booking.checkInDate) >= new Date();
    }).length;
    const totalSpent = bookings.reduce((sum, booking) => sum + getBookingTotal(booking), 0);
    return { totalBookings, upcomingTrips, totalSpent };
  }, [bookings, itineraryPricing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        name: formData.name,
        email: formData.email
      };
      if (formData.password) {
        updateData.password = formData.password;
      }
      const response = await userAPI.updateProfile(resolvedUserId, updateData);
      setUser(response.data);
      setMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      await userAPI.logout();
      localStorage.removeItem("currentUser");
      window.dispatchEvent(new Event("currentUserChanged"));
      navigate("/");
    } catch (error) {
      setMessage("Logout failed, but clearing local session");
      localStorage.removeItem("currentUser");
      window.dispatchEvent(new Event("currentUserChanged"));
      setTimeout(() => navigate("/"), 1000);
    }
  };

  const handleDeleteProfile = async () => {
    if (!resolvedUserId) return;

    const confirmDelete = window.confirm("Delete this profile permanently?");
    if (!confirmDelete) return;

    try {
      await userAPI.deleteProfile(resolvedUserId);
      localStorage.removeItem("currentUser");
      window.dispatchEvent(new Event("currentUserChanged"));
      setUser(null);
      setResolvedUserId("");
      setBookings([]);
      setMessage("Profile deleted successfully!");
      setIsEditing(false);
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to delete profile");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm("Cancel this booking?");
    if (!confirmCancel) return;
    try {
      await bookingAPI.cancel(bookingId);
      setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
      setBookingMessage({ type: "success", text: "Booking cancelled successfully." });
    } catch (error) {
      setBookingMessage({
        type: "error",
        text: error.response?.data?.error || "Unable to cancel booking."
      });
    }
  };

  if (loading) {
    return <div className="profile-container"><p>Loading profile...</p></div>;
  }

  return (
    <section className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          {message && <div className="message">{message}</div>}
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className={`edit-btn ${isEditing ? 'cancel' : ''}`}
                disabled={!user}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            {!user ? (
              <p className="no-bookings">No profile loaded. Please login first.</p>
            ) : !isEditing ? (
              <div className="profile-info">
                <div className="info-item">
                  <label>Name</label>
                  <p>{user.name}</p>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <p>{user.email}</p>
                </div>
                <div className="info-item">
                  <label>Role</label>
                  <p className="role-badge">{user.role}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="edit-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="save-btn">Save Changes</button>
              </form>
            )}

          </div>

          {/* Booking History Section */}
          <div className="profile-section bookings-panel">
            <div className="bookings-header">
              <div>
                <h2>My Bookings</h2>
                <p>View and manage all your Sigiriya Safari reservations.</p>
              </div>
            </div>

            <div className="bookings-summary">
              <div className="summary-card">
                <span className="summary-icon" aria-hidden="true">📋</span>
                <div>
                  <p>Total Bookings</p>
                  <h3>{bookingSummary.totalBookings}</h3>
                </div>
              </div>
              <div className="summary-card">
                <span className="summary-icon" aria-hidden="true">🗓️</span>
                <div>
                  <p>Upcoming Trips</p>
                  <h3>{bookingSummary.upcomingTrips}</h3>
                </div>
              </div>
              <div className="summary-card">
                <span className="summary-icon" aria-hidden="true">💰</span>
                <div>
                  <p>Total Spent</p>
                  <h3>{formatCurrency(bookingSummary.totalSpent)}</h3>
                </div>
              </div>
            </div>

            {bookingMessage.text && (
              <div className={`booking-message ${bookingMessage.type}`}>
                {bookingMessage.text}
              </div>
            )}

            {!user || bookings.length === 0 ? (
              <p className="no-bookings">No bookings yet. Start your adventure!</p>
            ) : (
              <div className="bookings-list modern">
                {bookings.map((booking, index) => {
                  const total = getBookingTotal(booking);
                  const tripDays = getTripDays(booking);
                  const bookingRef = getBookingRef(booking, index);
                  const canCancel = ["pending", "confirmed"].includes(booking.status);
                  const invoiceLink = booking.invoiceUrl || booking.invoiceLink || "";
                  const whatsAppNumber =
                    (import.meta.env.VITE_WHATSAPP_BUSINESS_NUMBER || "").replace(/\D/g, "");
                  const whatsAppLink = whatsAppNumber
                    ? `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
                        `Booking ${bookingRef} - ${getBookingTitle(booking)}`
                      )}`
                    : "";
                  return (
                    <div key={booking._id} className="booking-card modern">
                      <div className="booking-card-top">
                        <div>
                          <span className="booking-ref">#{bookingRef}</span>
                          <h3>{getBookingTitle(booking)}</h3>
                          <div className="booking-meta">
                            <span>📅 {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}</span>
                            <span>👥 {booking.guests || 1} guests</span>
                            <span>⏱ {tripDays || 1} days</span>
                          </div>
                        </div>
                        <span className={`status-pill ${booking.status}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="booking-card-bottom">
                        <div className="booking-total">
                          <span>Total</span>
                          <strong>{formatCurrency(total, getBookingCurrency(booking))}</strong>
                        </div>
                        <div className="booking-actions">
                          <a
                            className={`action-btn ${invoiceLink ? "" : "disabled"}`}
                            href={invoiceLink || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Invoice
                          </a>
                          <a
                            className={`action-btn ${whatsAppLink ? "" : "disabled"}`}
                            href={whatsAppLink || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            WhatsApp
                          </a>
                          {canCancel && (
                            <button
                              type="button"
                              className="action-btn cancel"
                              onClick={() => handleCancelBooking(booking._id)}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="profile-section">
            <PlanYourTrip />
          </div>

          <div className="profile-delete-section">
            <button
              type="button"
              className="edit-btn logout"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              type="button"
              className="edit-btn cancel"
              onClick={handleDeleteProfile}
              disabled={!resolvedUserId}
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
