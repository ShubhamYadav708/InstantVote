import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VerticalBar from "../components/VerticalBar";
import { socket } from "../socket";
import { shootConfetti } from "../utils/confetti";
import "./PollResults.css";

const PollResults = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/polls/${id}`)
      .then((res) => {
        setPoll(res.data);
        shootConfetti();
      })
      .catch((err) => {
        console.error("Failed to load poll results", err);
      });
    socket.emit("joinPoll", id);
    socket.on("resultsUpdated", setPoll);

    return () => {
      socket.off("resultsUpdated");
    };
  }, [id, API_URL]);

  if (!poll) return <div className="text-center mt-5">Loading...</div>;

  const isExpired =
    poll.isExpired ?? new Date(poll.expiresAt) < new Date();

  const totalVotes = poll.options.reduce((a, b) => a + b.votes, 0);
  const maxVotes = Math.max(...poll.options.map((o) => o.votes));

  return (
    <div className="results-page">
      <div className="results-card">

        <h2 className="results-title">{poll.question}</h2>

        <p className="results-meta">
          {totalVotes} people voted
        </p>

        <div className="bar-grid">
          {poll.options.map((opt, i) => {
            const isWinner =
              isExpired && opt.votes === maxVotes && maxVotes > 0;
            const isLeading =
              !isExpired && opt.votes === maxVotes && maxVotes > 0;

            return (
              <VerticalBar
                key={i}
                option={opt}
                totalVotes={totalVotes}
                isWinner={isWinner}
                isLeading={isLeading}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default PollResults;
