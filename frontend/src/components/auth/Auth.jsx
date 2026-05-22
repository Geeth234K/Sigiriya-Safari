import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../../services/api";
import "./auth.css";

export default function Auth({ onLogin, onClose, defaultMode = "login" }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(defaultMode !== "signup");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLogin(defaultMode !== "signup");
    setMessage("");
  }, [defaultMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const response = await userAPI.login({
          email: formData.email,
          password: formData.password
        });
        const userId = response.data.id || response.data._id;
        onLogin(response.data);
        setMessage("Login successful! Redirecting to your profile...");
        localStorage.setItem("currentUser", JSON.stringify({
          id: userId,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role
        }));
        window.dispatchEvent(new Event("currentUserChanged"));
        setTimeout(() => {
          onClose();
          navigate(`/profile/${userId}`);
        }, 1500);
      } else {
        const response = await userAPI.register(formData);
        const userId = response.data.id || response.data._id;
        setMessage("Registration successful! Redirecting to your profile...");
        localStorage.setItem("currentUser", JSON.stringify({
          id: userId,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role
        }));
        window.dispatchEvent(new Event("currentUserChanged"));
        setTimeout(() => {
          onClose();
          navigate(`/profile/${userId}`);
        }, 1500);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-container">
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <h2>{isLogin ? "Login" : "Register"}</h2>
        
        {message && (
          <div className={`message ${message.includes("Error") || message.includes("error") ? "error" : "success"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="toggle-auth">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
