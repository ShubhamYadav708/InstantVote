import { useEffect, useState } from "react";

const VoteBar = ({ option, totalVotes, onVote, disabled, showResults, voted }) => {
  const [pulse, setPulse] = useState(false);

  const percent =
    totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);

  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [option.votes]);

  return (
    <div
      className={`vote-option
        ${disabled ? "disabled" : ""}
        ${pulse ? "vote-pulse" : ""}
        ${voted ? "voted" : ""}
      `}
      onClick={!disabled && !showResults ? onVote : null}
    >
      <div className="d-flex justify-content-between align-items-center mb-1">
        <span className="fw-semibold">{option.text}</span>
        {voted && <span className="voted-badge">You voted</span>}

        {showResults && <span className="fw-bold">{percent}%</span>}
      </div>

      {showResults && (
        <div className="progress" style={{ height: "10px", borderRadius: "10px" }}>
          <div
            className="progress-bar vote-bar-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default VoteBar;
