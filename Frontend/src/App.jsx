import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated } from "./utils/auth";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import CreatePoll from "./pages/CreatePoll";
import Poll from "./pages/Poll";
import PollResults from "./pages/pollResults";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import OAuthSuccess from "./pages/oauthSuccess";
import HowItWorks from "./pages/HowItWorks";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    const updateAuth = () => setLoggedIn(isAuthenticated());
    window.addEventListener("authChanged", updateAuth);
    return () => window.removeEventListener("authChanged", updateAuth);
  }, []);

  return (
    <Router>
      <div className="app-layout">
        <Navbar isLoggedIn={loggedIn} />

        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreatePoll />
                </ProtectedRoute>
              }
            />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/poll/:id" element={<Poll />} />
            <Route path="/poll/:id/results" element={<PollResults />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
