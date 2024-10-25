import React from 'react';
import './Contact.css'; 
const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <div className="contact-info">
        <div className="contact-item">
          <h3>Tanya Parmar</h3>
          <p>Email: tanyaparmar03@gmail.com</p>
          <p>
            LinkedIn: <a href="https://www.linkedin.com/in/tanyaparmar27/" target="_blank" rel="noopener noreferrer">Tanya Parmar</a>
          </p>
        </div>
        <div className="contact-item">
          <h3>Jay Bhuva</h3>
          <p>Email: jaybhuva57@gmail.com</p>
          <p>
            LinkedIn: <a href="https://www.linkedin.com/in/jay-bhuva-320214265/" target="_blank" rel="noopener noreferrer">Jay Bhuva</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
