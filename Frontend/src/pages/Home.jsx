import "./Home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { isAuthenticated } from "../utils/auth";
import {
  FaBolt,
  FaLock,
  FaChartBar,
  FaUsers,
  FaClock,
  FaRocket
} from "react-icons/fa";

const Home = () => {
  const redirectPath = isAuthenticated() ? "/create" : "/login";

  return (
    <div className="home-wrapper">

      <section className="hero-section">
        <motion.div
          className="container text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 className="hero-title">
            Real-Time Polling,
            <br /> Made Simple
          </motion.h1>

          <p className="hero-subtitle">
            Create polls, share instantly and watch results update live.
            Built for teams, classrooms and communities.
          </p>

          <div className="hero-actions">
            <Link to={redirectPath} className="btn btn-primary btn-lg">
              Create a Poll
            </Link>
            <Link to={redirectPath} className="btn btn-outline-light btn-lg">
              Get Started
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title text-center">Why InstantPoll?</h2>

          <div className="row g-4 mt-4">
            {[
              { icon: <FaBolt />, title: "Instant Results", text: "Votes update live using WebSockets with zero refresh." },
              { icon: <FaLock />, title: "Secure & Private", text: "JWT authentication with one-vote protection." },
              { icon: <FaChartBar />, title: "Beautiful Analytics", text: "Clean animated charts and winner highlights." },
              { icon: <FaUsers />, title: "Unlimited Voters", text: "Share a link and invite anyone to vote." },
              { icon: <FaClock />, title: "Auto Expiry", text: "Polls close automatically when time ends." },
              { icon: <FaRocket />, title: "Blazing Fast", text: "Optimized backend for real-time traffic." },
            ].map((f, i) => (
              <div className="col-lg-4 col-md-6 col-12" key={i}>
                <div className="feature-card text-center">
                  <div className="feature-icon">{f.icon}</div>
                  <h5>{f.title}</h5>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-steps">
        <div className="container text-center">
          <h2 className="flow-title">How InstantPoll Works</h2>
          <p className="flow-subtitle">
            From idea to winner in seconds. Simple, fast and powerful.
          </p>

          <div className="flow-wrapper">
            {["Create Poll", "Share Link", "Vote Live", "See Winner"].map((step, i) => (
              <div className="flow-step" key={i}>
                <div className="flow-dot"></div>
                <div className="step-pill">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <h2>Start voting smarter today</h2>
          <p>Create your first poll in less than 30 seconds.</p>
          <Link to={redirectPath} className="cta-btn">
            Get Started Free
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
