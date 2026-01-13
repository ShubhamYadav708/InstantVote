import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { socket } from "../socket";
import VoteBar from "../components/VoteBar";
import { getRemainingTime } from "../utils/time";
import { shootConfetti } from "../utils/confetti";
import {
  FiUsers,
  FiClock,
  FiBarChart2,
  FiAlertTriangle,
  FiLink
} from "react-icons/fi";
import "./Poll.css";

const API = import.meta.env.VITE_API_URL;

const Poll = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [poll, setPoll] = useState(null);
  const [viewers, setViewers] = useState(0);
  const [expired, setExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [glow, setGlow] = useState(false);
  const [votedIndex, setVotedIndex] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Correct public shareable link
  const pollLink = `${window.location.origin}/poll/${id}`;
  const isCreator = localStorage.getItem(`creator-${id}`) === "true";

  useEffect(() => {
    socket.emit("joinPoll", id);

    const savedVote = localStorage.getItem(`${id}-vote`);
    if (savedVote !== null) {
      setVotedIndex(Number(savedVote));
    }

    axios.get(`${API}/api/polls/${id}`)
      .then(res => {
        setPoll(res.data);
        if (!localStorage.getItem(`creator-${id}`)) {
          localStorage.setItem(`creator-${id}`, "true");
        }
      })
      .catch(() => setError("Poll not found"));

    socket.on("resultsUpdated", setPoll);

    socket.on("viewerCount", v => {
      setViewers(v);
      setGlow(true);
      setTimeout(() => setGlow(false), 800);
    });

    socket.on("pollExpired", () => {
      setExpired(true);
      setTimeLeft("Expired");
    });

    return () => {
      socket.off("resultsUpdated");
      socket.off("viewerCount");
      socket.off("pollExpired");
    };
  }, [id]);

  useEffect(() => {
    if (!poll?.expiresAt) return;

    const timer = setInterval(() => {
      const diff = new Date(poll.expiresAt) - new Date();
      if (diff <= 0) {
        setExpired(true);
        setTimeLeft("Expired");
        clearInterval(timer);
      } else {
        setTimeLeft(getRemainingTime(poll.expiresAt));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [poll]);

  useEffect(() => {
    if (expired) {
      setTimeout(() => {
        navigate(`/poll/${id}/results`);
      }, 2000);
    }
  }, [expired, navigate, id]);

  const vote = async (index) => {
    if (localStorage.getItem(id)) {
      setError("You can't vote twice on the same poll");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      await axios.post(`${API}/api/polls/${id}/vote`, {
        optionIndex: index
      });

      localStorage.setItem(id, true);
      localStorage.setItem(`${id}-vote`, index);
      setVotedIndex(index);

      shootConfetti();
    } catch {
      setError("Vote failed. Please try again.");
    }
  };

  if (!poll) return <div className="poll-loading">Loading poll...</div>;

  const totalVotes = poll.options.reduce((a, b) => a + b.votes, 0);
  const maxVotes = Math.max(...poll.options.map(o => o.votes));

  return (
    <div className="poll-page">
      <div className={`poll-card ${glow ? "poll-glow" : ""}`}>

        <h2 className="poll-title">{poll.question}</h2>

        <div className="poll-meta">
          <div className="meta-item">
            <FiUsers />
            <span>{viewers} watching</span>
          </div>

          <div className={`meta-item ${expired ? "danger" : "success"}`}>
            <FiClock />
            <span>
              {expired ? "Poll closed" : `Ends in ${timeLeft}`}
            </span>
          </div>
        </div>

        {expired && (
          <div className="poll-expired">
            <FiAlertTriangle />
            <span>This poll has ended</span>
          </div>
        )}

        {error && <div className="poll-error">{error}</div>}

        <div className="poll-options">
          {poll.options.map((opt, i) => (
            <div key={i} className={expired && opt.votes === maxVotes ? "winner" : ""}>
              <VoteBar
                option={opt}
                totalVotes={totalVotes}
                onVote={() => vote(i)}
                disabled={expired}
                showResults={false}
                voted={votedIndex === i}
              />
            </div>
          ))}
        </div>

        <button
          className="results-btn"
          onClick={() => navigate(`/poll/${id}/results`)}
        >
          <FiBarChart2 /> View Results
        </button>

        {isCreator && (
          <div className="share-link-box">
            <FiLink />
            <input value={pollLink} readOnly />
            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(pollLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              {copied ? "Copied ✓" : "Copy Poll Link"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Poll;
