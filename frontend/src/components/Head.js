import React from "react";
import "./Header.css"; 

const Head = () => {
  return (
    <header>
      <nav>
        <h1>InterviewEdge</h1>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Head;
