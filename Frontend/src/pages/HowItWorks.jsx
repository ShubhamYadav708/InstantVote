import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaVoteYea,
  FaLink,
  FaUsers,
  FaChartBar,
  FaLock,
  FaStopwatch,
  FaTrophy,
  FaRocket
} from "react-icons/fa";

import "./HowItWorks.css";

const steps = [
  {
    icon: <FaVoteYea />,
    title: "Create a Poll",
    desc: "Set up your poll in seconds. Add options, duration, and visibility.",
  },
  {
    icon: <FaLink />,
    title: "Share Link",
    desc: "Get a unique poll link and share it anywhere instantly.",
  },
  {
    icon: <FaUsers />,
    title: "People Vote",
    desc: "Participants vote in real-time from any device.",
  },
  {
    icon: <FaChartBar />,
    title: "Live Results",
    desc: "Watch results update live as votes come in.",
  },
  {
    icon: <FaStopwatch />,
    title: "Auto Expiry",
    desc: "Polls close automatically when the timer ends.",
  },
  {
    icon: <FaLock />,
    title: "Secure & Fair",
    desc: "Fraud protection ensures every vote is counted once.",
  },
  {
    icon: <FaTrophy />,
    title: "Winner Declared",
    desc: "Top option is highlighted automatically when voting ends.",
  },
  {
    icon: <FaRocket />,
    title: "Share Results",
    desc: "Publish or share the results instantly with your audience.",
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div className="how-page">
      <motion.h1
        className="how-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        How It Works
      </motion.h1>

      <motion.p
        className="how-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Run fast, fair and beautiful online polls in just a few clicks.
      </motion.p>

      <div className="how-steps">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="how-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="how-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="how-cta"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Start your first poll now</h2>
        <button onClick={() => navigate("/signup")}>
          Create a Poll
        </button>
      </motion.div>
    </div>
  );
}
