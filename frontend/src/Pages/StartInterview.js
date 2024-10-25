import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./StartInterview.css";
const StartInterview = () => {
  const [interviewerName, setInterviewerName] = useState("");
  const [numInterviews, setNumInterviews] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (interviewerName && numInterviews) {
      // Store the interviewer details or pass them via state
      navigate("/interviewee-info", {
        state: { interviewerName, numInterviews },
      }); // Pass state to next page
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="start-interview-container">
      <h2>Start Interview</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="interviewerName">Interviewer Name:</label>
          <input
            type="text"
            id="interviewerName"
            value={interviewerName}
            onChange={(e) => setInterviewerName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numInterviews">Number of Interviews:</label>
          <input
            type="number"
            id="numInterviews"
            value={numInterviews}
            onChange={(e) => setNumInterviews(e.target.value)}
            required
            min="1"
          />
        </div>
        <button type="submit" className="btn">
          Proceed
        </button>
      </form>
    </div>
  );
};

export default StartInterview;
