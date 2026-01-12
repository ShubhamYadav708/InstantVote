import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { setAuth, getAuth } from "../utils/auth";
import { FcGoogle } from "react-icons/fc";
import { FaWindows } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Auth.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://instantvote-backend.onrender.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuth();
    if (token) {
      navigate("/create", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      setAuth(data.token);
      navigate("/create", { replace: true });
    } catch (err) {
      alert("Something went wrong");
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
      <div className="auth-card">
        <h4 className="text-center mb-4">Welcome Back</h4>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-wrapper mb-4">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button className="btn auth-btn w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="social-divider">OR</div>

        <div className="social-buttons">
          <button
            type="button"
            className="social-btn google-btn"
            onClick={handleGoogleOAuth}
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <button
            type="button"
            className="social-btn microsoft-btn"
            onClick={handleMicrosoftOAuth}
          >
            <FaWindows size={18} />
            Continue with Microsoft
          </button>
        </div>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/signup" className="auth-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
