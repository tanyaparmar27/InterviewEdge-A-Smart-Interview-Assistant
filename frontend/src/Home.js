import React from "react";
import "./Home.css"; 

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="intro">
        <h2>InterviewEdge: A Smart Interview Assistant</h2>
        <p>
          Streamline your interview process with our AI-powered assistant. Get
          evaluations, track progress, and improve efficiency.
        </p>
        <div className="cta-buttons">
          <a href="/start" className="btn">
            Start an Interview
          </a>
          <a href="/about" className="btn btn-secondary">
            Learn More
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
