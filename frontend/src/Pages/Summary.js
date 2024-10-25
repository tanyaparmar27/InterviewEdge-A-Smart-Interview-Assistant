import React from "react";
import { jsPDF } from "jspdf";
import { useNavigate, useLocation } from "react-router-dom";
import './Summary.css';

const Summary = () => {
  const location = useLocation();
  const { intervieweeName, programmingLanguage, currentInterviewSummary, remainingInterviews, interviewerName } = location.state;

  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
  
   
    doc.text(`Interview Summary for ${intervieweeName}`, 10, 10);
    doc.text(`Programming Language: ${programmingLanguage}`, 10, 20);
  
    let yOffset = 30; 
    const pageHeight = doc.internal.pageSize.height; 
    const lineHeight = 10; 
    const maxLineWidth = 180;
  
    currentInterviewSummary.forEach((item, index) => {
      if (yOffset > pageHeight - 20) {
        doc.addPage(); 
        yOffset = 20; 
      }
  
      doc.setFont("helvetica", "bold");
      const questionLabel = `Q${index + 1}: `;
      const questionLines = doc.splitTextToSize(`${questionLabel}${item.question}`, maxLineWidth);
      doc.text(questionLabel, 10, yOffset);
      
      doc.setFont("helvetica", "normal");
      doc.text(doc.splitTextToSize(item.question, maxLineWidth), 10 + doc.getTextWidth(questionLabel), yOffset);
      yOffset += questionLines.length * lineHeight;
  
      doc.setFont("helvetica", "bold");
      doc.text("Answer:", 10, yOffset);
      
      doc.setFont("helvetica", "normal");
      const answerLines = doc.splitTextToSize(item.answer, maxLineWidth);
      doc.text(answerLines, 10 + doc.getTextWidth("Answer: "), yOffset);
      yOffset += answerLines.length * lineHeight;
  
      doc.setFont("helvetica", "bold");
      doc.text("Evaluation:", 10, yOffset);
      
      doc.setFont("helvetica", "normal");
      const evaluationLines = doc.splitTextToSize(item.evaluationResult, maxLineWidth);
      doc.text(evaluationLines, 10 + doc.getTextWidth("Evaluation: "), yOffset);
      yOffset += evaluationLines.length * lineHeight + 5; 
    });
  
    doc.save(`${intervieweeName}_summary.pdf`);
  };
  

  const handleNextInterview = () => {
    if (remainingInterviews > 0) {
      navigate("/interviewee-info", {
        state: {
          interviewerName,
          numInterviews: remainingInterviews,
        },
      });
    } else {
      alert("All interviews completed!");
    }
  };

  return (
    <div className="summary-container">
      <h2>Interview Summary for {intervieweeName}</h2>
      {currentInterviewSummary.map((item, index) => (
        <div key={index}>
          <h4>Q{index + 1}: {item.question}</h4>
          <p><strong>Answer:</strong> {item.answer}</p>
          <p><strong>Evaluation:</strong> {item.evaluationResult}</p>
        </div>
      ))}
      <button className="btn" onClick={handleDownloadPDF}>Download PDF</button>
      <button className="btn" onClick={handleNextInterview}>
        {remainingInterviews > 0 ? "Next Interview" : "Finish"}
      </button>
    </div>
  );
};

export default Summary;
