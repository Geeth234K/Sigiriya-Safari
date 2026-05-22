import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI, bookingAPI } from "../../services/api";
import PlanYourTrip from "./PlanYourTrip";
import "./profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [resolvedUserId, setResolvedUserId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
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
          <div className="profile-section">
            <h2>Your Bookings</h2>
            {!user || bookings.length === 0 ? (
              <p className="no-bookings">No bookings yet. Start your adventure!</p>
            ) : (
              <div className="bookings-list">
                {bookings.map((booking) => (
                  <div key={booking._id} className="booking-card">
                    <div className="booking-header">
                      <span className={`status-badge ${booking.status}`}>
                        {booking.status.toUpperCase()}
                      </span>
                      <span className="booking-dates">
                        {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="booking-details">
                      {booking.roomId && <p><strong>Room ID:</strong> {booking.roomId}</p>}
                      {booking.safariId && <p><strong>Safari ID:</strong> {booking.safariId}</p>}
                    </div>
                  </div>
                ))}
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
