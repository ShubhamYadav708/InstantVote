import "../pages/PollResults.css";
import { FiAward } from "react-icons/fi";

const VerticalBar = ({ option, totalVotes, isWinner }) => {
  const percentage =
    totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);

  return (
    <div className={`result-bar ${isWinner ? "winner" : ""}`}>

      {isWinner && (
        <div className="result-badge winner">
          <FiAward className="winner-icon" />
          Winner
        </div>
      )}

      <div className="percent-pill">
        {percentage}%
      </div>

      <div className="bar-container">
        <div
          className="bar-fill"
          style={{ height: `${percentage}%` }}
        />
      </div>
      <div className="bar-label">
        {option.text}
      </div>
      <div className="bar-votes">
        {option.votes} {option.votes === 1 ? "vote" : "votes"}
      </div>

    </div>
  );
};

export default VerticalBar;
