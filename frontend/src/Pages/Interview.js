import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Interview.css";

const Interview = () => {
  const baseURL = "https://e259-3-238-99-151.ngrok-free.app";
  const location = useLocation();
  const {
    interviewerName,
    numInterviews,
    intervieweeName,
    programmingLanguage,
  } = location.state;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [evaluationResult, setEvaluationResult] = useState("");
  const [currentInterviewSummary, setCurrentInterviewSummary] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingQuestion, setIsRecordingQuestion] = useState(false);
  const [transcript, setTranscript] = useState(""); 
  const [questionTranscript, setQuestionTranscript] = useState(""); 
  const recognitionRef = useRef(null);
  const questionRecognitionRef = useRef(null);
  const navigate = useNavigate();

  const toggleAnswerRecording = () => {
    if (!isRecording) {
      startRecordingAnswer();
    } else {
      stopRecordingAnswer();
    }
    setIsRecording(!isRecording);
  };

  const toggleQuestionRecording = () => {
    if (!isRecordingQuestion) {
      startRecordingQuestion();
    } else {
      stopRecordingQuestion();
    }
    setIsRecordingQuestion(!isRecordingQuestion);
  };

  const startRecordingAnswer = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Sorry, your browser does not support the Speech Recognition API');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentQuestionIndex] = speechResult;
        return newAnswers;
      });
    };

    recognition.onerror = (event) => {
      console.error(event.error);
    };

    recognition.onend = () => {
      console.log('Answer recording stopped');
    };

    recognition.start();
    recognitionRef.current = recognition;
    console.log('Answer recording started');
  };

  const stopRecordingAnswer = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      console.log('Answer recording stopped');
    }
  };

  const startRecordingQuestion = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Sorry, your browser does not support the Speech Recognition API');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setQuestionTranscript(speechResult);
      setNewQuestion(speechResult);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
    };

    recognition.onend = () => {
      console.log('Question recording stopped');
    };

    recognition.start();
    questionRecognitionRef.current = recognition;
    console.log('Question recording started');
  };

  const stopRecordingQuestion = () => {
    if (questionRecognitionRef.current) {
      questionRecognitionRef.current.stop();
      console.log('Question recording stopped');
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion) {
      setQuestions((prev) => [...prev, newQuestion]);
      setNewQuestion("");
      setQuestionTranscript(""); 
    } else {
      alert("Please enter or speak a question.");
    }
  };

  const handleEvaluateAnswer = async () => {
    const answer = answers[currentQuestionIndex] || "";
    const question = questions[currentQuestionIndex] || "";
    let endpoint = "";
    if (programmingLanguage === "Java") {
      endpoint = `${baseURL}/evaluate_java`;
    } else if (programmingLanguage === "C++") {
      endpoint = `${baseURL}/evaluate_cpp`;
    } else if (programmingLanguage === "C") {
      endpoint = `${baseURL}/evaluate_c`;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
          user_answer: answer,
          job_title: "fresher",
          years_of_experience: "0",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to evaluate answer. Please try again.");
      }

      const data = await response.json();
      setEvaluationResult(data.evaluation);
    } catch (error) {
      console.error("Error evaluating answer:", error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length) {
      const answer = answers[currentQuestionIndex] || "";
      const evaluation = evaluationResult || "";

      setCurrentInterviewSummary((prev) => [
        ...prev,
        {
          question: questions[currentQuestionIndex],
          answer,
          evaluationResult: evaluation,
        },
      ]);

      setTranscript("");
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentQuestionIndex] = "";
        return newAnswers;
      });

      setCurrentQuestionIndex((prev) => prev + 1);
      setEvaluationResult("");
    }
  };

  const handleFinishInterview = () => {
    const answer = answers[currentQuestionIndex] || "";
    const evaluation = evaluationResult || "";

    const finalInterviewSummary = [
      ...currentInterviewSummary,
      {
        question: questions[currentQuestionIndex],
        answer,
        evaluationResult: evaluation,
      },
    ];

    navigate("/summary", {
      state: {
        intervieweeName,
        programmingLanguage,
        currentInterviewSummary: finalInterviewSummary,
        remainingInterviews: numInterviews - 1,
        interviewerName,
      },
    });

    setCurrentInterviewSummary([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuestions([]);
    setEvaluationResult("");
  };

  useEffect(() => {
    console.log("Current Interview Summary:", currentInterviewSummary);
  }, [currentInterviewSummary]);

  return (
    <div className="interview-container">
      <h2>Interview with {intervieweeName}</h2>

      <h3>Add Questions</h3>
      <div className="form-group">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Enter a question"
        />
        <button onClick={toggleQuestionRecording} className="btn">
          {isRecordingQuestion ? "Stop Recording" : "Record Question"}
        </button>
        <p>{questionTranscript}</p>
        <button onClick={handleAddQuestion} className="btn">
          Add Question
        </button>
      </div>

      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <>
          <h3>{questions[currentQuestionIndex]}</h3>

          <div className="form-group">
            <label htmlFor="answer">Your Answer:</label>
            <div>
              <button onClick={toggleAnswerRecording} className="btn">
                {isRecording ? "Stop Recording" : "Record Answer"}
              </button>
            </div>
            <p>{transcript || answers[currentQuestionIndex]}</p>
          </div>

          <button onClick={handleEvaluateAnswer} className="btn">
            Evaluate Answer
          </button>
          {evaluationResult && <p>Evaluation Result: {evaluationResult}</p>}
          <button onClick={handleNextQuestion} className="btn">
            Next Question
          </button>
          <button onClick={handleFinishInterview} className="btn">
            Finish Interview
          </button>
        </>
      ) : (
        <h3>No questions available for the interview yet!</h3>
      )}
    </div>
  );
};

export default Interview;
