import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './IntervieweeInfo.css';

const IntervieweeInfo = () => {
  const location = useLocation();
  const { interviewerName, numInterviews } = location.state;
  const [intervieweeName, setIntervieweeName] = useState('');
  const [programmingLanguage, setProgrammingLanguage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (intervieweeName && programmingLanguage) {
      navigate('/interview', { state: { interviewerName, numInterviews, intervieweeName, programmingLanguage } });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="interviewee-info-container">
      <h2>Interviewee Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="intervieweeName">Interviewee Name:</label>
          <input
            type="text"
            id="intervieweeName"
            value={intervieweeName}
            onChange={(e) => setIntervieweeName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Programming Language:</label>
          <div>
            <label>
              <input
                type="radio"
                value="Java"
                checked={programmingLanguage === 'Java'}
                onChange={(e) => setProgrammingLanguage(e.target.value)}
                required
              />
              Java
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="C"
                checked={programmingLanguage === 'C'}
                onChange={(e) => setProgrammingLanguage(e.target.value)}
                required
              />
              C
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="C++"
                checked={programmingLanguage === 'C++'}
                onChange={(e) => setProgrammingLanguage(e.target.value)}
                required
              />
              C++
            </label>
          </div>
        </div>
        <button type="submit" className="btn">Start Interview</button>
      </form>
    </div>
  );
};

export default IntervieweeInfo;
