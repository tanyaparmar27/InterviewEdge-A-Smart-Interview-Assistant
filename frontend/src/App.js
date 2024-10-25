import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './Home';
import AboutPage from './Pages/AboutPage';
import StartInterview from './Pages/StartInterview';
import IntervieweeInfo from './Pages/IntervieweeInfo';
import Interview from './Pages/Interview';
import Summary from './Pages/Summary';
import ContactPage from './Pages/Contact';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/start" element={<StartInterview />} />
          <Route path="/interviewee-info" element={<IntervieweeInfo />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/summary" element={<Summary />} />
          
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
