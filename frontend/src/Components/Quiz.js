import React, { useState, useEffect } from 'react';
import "../Styles/Quiz.css"

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [batchIndex, setBatchIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30); // Timer in seconds

  useEffect(() => {
    fetchQuestions();
  }, [batchIndex]); // Fetch questions whenever batchIndex changes

  useEffect(() => {
    // Reset timer when currentQuestionIndex changes
    setTimer(30);
    const timerInterval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    // Clear interval when component unmounts or currentQuestionIndex changes
    return () => clearInterval(timerInterval);
  }, [currentQuestionIndex]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`http://localhost:8082/api/questions?page=${batchIndex}&size=5`);
      const data = await response.json();
      setQuestions(data);
      setCurrentQuestionIndex(0); // Reset current question index
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleNextBatch = () => {
    setBatchIndex(prevBatchIndex => prevBatchIndex + 1);
  };

  const handlePreviousBatch = () => {
    setBatchIndex(prevBatchIndex => (prevBatchIndex - 1 < 0 ? 0 : prevBatchIndex - 1));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimer(30); // Reset timer for the next question
    }
  };

  const renderTimer = () => {
    if (timer === 0) {
      handleNextQuestion();
    }
  };

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

  return (
    <div className="App container">
      <h1 className="my-4 text-center">Quiz Questions</h1>
      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        <div>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{currentQuestion.question}</h5>
              <ul className="list-group list-group-flush">
                {currentQuestion.options.map((option, index) => (
                  <li key={index} className="list-group-item">
                    {option}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <div>
                Time Left: {timer} seconds
              </div>
              <button onClick={handleNextQuestion} className="btn btn-primary">
                Next Question
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button onClick={handlePreviousBatch} className="btn btn-secondary" disabled={batchIndex === 0}>
              Previous
            </button>
            <button onClick={handleNextBatch} className="btn btn-secondary">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
