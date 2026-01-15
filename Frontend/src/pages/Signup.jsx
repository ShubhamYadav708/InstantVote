import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaWindows } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { setAuth } from "../utils/auth";
import "./Auth.css";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://instantvote-backend.onrender.com";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/signup`,
        formData
      );

      setAuth(res.data.token);
      navigate("/create", { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleOAuth = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  const handleMicrosoftOAuth = () => {
    window.location.href = `${BACKEND_URL}/auth/microsoft`;
  };

  return (
    <div className="auth-wrapper">
      <div className={`auth-card ${error ? "shake" : ""}`}>
        <h3 className="text-center mb-4">Create Your Account</h3>

        {error && (
          <div className="alert alert-danger auth-alert text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-wrapper mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </span>
          </div>

          <button
            type="submit"
            className="btn auth-btn w-100"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="social-divider">OR</div>

        <div className="social-buttons">
          <button
            className="social-btn google-btn"
            onClick={handleGoogleOAuth}
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <button
            className="social-btn microsoft-btn"
            onClick={handleMicrosoftOAuth}
          >
            <FaWindows size={18} />
            Continue with Microsoft
          </button>
        </div>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
