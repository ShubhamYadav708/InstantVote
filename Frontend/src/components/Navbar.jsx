import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, logout, subscribeAuth } from "../utils/auth";
import logo from "../assets/voting-box-3.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(getAuth());

  useEffect(() => {
    const unsub = subscribeAuth(setToken);
    return unsub;
  }, []);

  const isLoggedIn = !!token;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg customNav">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={logo} alt="InstantVote Logo" width="32" height="32" />
          <span className="fw-semibold">InstantPoll</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/create">Create Poll</Link>
              </li>
            )}

            {!isLoggedIn && (
              <li className="nav-item">
                <Link to="/how-it-works" className="nav-link">
                  How It Works
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex gap-2">
            {!isLoggedIn ? (
              <>
                <Link className="btn btn-outline-primary" to="/login">Login</Link>
                <Link className="btn btn-primary" to="/signup">Sign Up</Link>
              </>
            ) : (
              <button className="btn btn-outline-primary" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
