import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle, FiX, FiAlertCircle } from "react-icons/fi";
import "./CreatePoll.css";
import { getAuth } from "../utils/auth";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [expiry, setExpiry] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addOption = () => setOptions([...options, ""]);

  const removeOption = (index) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== index));
  };

  const validate = () => {
    if (!question.trim()) return "Poll question is required.";
    if (options.some(o => !o.trim())) return "All options must be filled.";
    if (options.length < 2) return "At least two options are required.";
    if (!expiry || expiry < 1) return "Expiry must be at least 1 minute.";
    return "";
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError("");
      setLoading(true);
      const expiresAt = new Date(Date.now() + Number(expiry) * 60000);



      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/polls`,
        {
          question,
          options: options.map(text => ({ text })),
          expiresAt
        },
        {
          headers: {
            Authorization: `Bearer ${getAuth()}`,
            "Content-Type": "application/json"
          }
        }
      );



      navigate(`/poll/${res.data._id}`);
    } catch {
      setError("Something went wrong while creating your poll.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-poll-wrapper">
      <div className="create-poll-card">

        <h3>Create a New Poll</h3>
        <p>Ask a question and let people vote instantly</p>

        {error && (
          <div className="form-error error">
            <FiAlertCircle /> {error}
          </div>
        )}


        <label>Poll Question</label>
        <input
          className="poll-input"
          placeholder="e.g. Which framework do you prefer?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <label>Poll Options</label>

        {options.map((opt, i) => (
          <div className="option-row" key={i}>
            <input
              className="poll-input"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const copy = [...options];
                copy[i] = e.target.value;
                setOptions(copy);
              }}
            />

            {options.length > 2 && (
              <button
                type="button"
                className="remove-option"
                onClick={() => removeOption(i)}
                aria-label="Remove option"
              >
                <FiX size={18} />
              </button>

            )}
          </div>
        ))}

        <div className="add-option" onClick={addOption}>
          <FiPlusCircle /> Add another option
        </div>

        <label>Poll Expiry (minutes)</label>
        <input
          type="number"
          min="1"
          className="poll-input"
          placeholder="e.g. 10"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />

        <button
          className="create-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Poll"}
        </button>

      </div>
    </div>
  );
};

export default CreatePoll;
