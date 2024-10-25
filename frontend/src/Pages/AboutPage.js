import React from 'react';
import './AboutPage.css'; 

const AboutPage = () => {
  return (
    <div className="about-container">
      <section className="about-content">
        <h2>About Interview Assistant</h2>

        <p>
          Welcome to Interview Assistant—a cutting-edge, AI-powered tool that revolutionizes technical interviews in Java, C++, and C!
          Our platform is designed to enhance the interview experience for both interviewers and candidates, ensuring that every assessment is efficient and effective.
        </p>

        <div className="features-container">
          <div className="feature-box">
            <h3>🚀 Automated Evaluations</h3>
            <p>
              Say goodbye to manual grading! Our intelligent system instantly evaluates responses to technical questions, ensuring precise assessments in real time.
            </p>
          </div>
          <div className="feature-box">
            <h3>⚡ Real-Time Feedback</h3>
            <p>
              Empower your candidates with immediate insights! Our platform delivers constructive feedback, helping candidates sharpen their skills on the spot.
            </p>
          </div>
          <div className="feature-box">
            <h3>🎯 Customizable Templates</h3>
            <p>
              Tailor your interview process! Create personalized templates for various technical roles, ensuring comprehensive and relevant assessments every time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;