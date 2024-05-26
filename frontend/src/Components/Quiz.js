import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, ProgressBar } from "react-bootstrap";
import "../Styles/Quiz.css";

const Quiz = () => {
  const { subjectCode } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30); // in seconds

  useEffect(() => {
    // Check if subjectCode is available
    if (subjectCode) {
      const decodedSubjectCode = decodeURIComponent(subjectCode);

      // Fetch questions data based on decoded subject code
      fetch(
        `http://localhost:8082/api/questions?subjectCode=${decodedSubjectCode}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched questions:", data);
          const initialSelectedAnswers = {};
          data.forEach((question) => {
            initialSelectedAnswers[question.id] = null; // Initialize selected answer for each question
          });
          setSelectedAnswers(initialSelectedAnswers);
          setQuestions(data);
          setTimeRemaining(30); // Reset time for each new set of questions
        })
        .catch((error) => console.error("Error fetching questions:", error));
    } else {
      console.error("Subject code not found in route parameters");
      // Handle the case where subjectCode is missing (e.g., display an error message)
    }
  }, [subjectCode]);

  useEffect(() => {
    // Timer logic
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        // Time's up, change to the next question
        handleNextQuestion();
      }
    }, 1000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, [timeRemaining]);

  const handleAnswerSelect = (questionId, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: selectedOption,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeRemaining(30); // Reset time for each new question
    } else {
      // Quiz completed
      setQuizCompleted(true);
    }
  };

  const handleSubmitQuiz = () => {
    // Submit selected answers logic here (e.g., send to backend, calculate score, etc.)
    console.log("Selected Answers:", selectedAnswers);
    setQuizCompleted(true);
  };

  // Check if questions is an array before rendering
  if (!Array.isArray(questions) || questions.length === 0) {
    return <p className="quiz-message">No questions available</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <ProgressBar
        now={(currentQuestionIndex + 1) / questions.length * 100}
        label={`${Math.floor((currentQuestionIndex + 1) / questions.length * 100)}%`}
        className="progress-bar"
      />
      <Card className="question-card">
        <Card.Header>
          <div className="timer">
            Time Remaining:{" "}
            <span className={timeRemaining < 15 ? "time-red" : ""}>
              {timeRemaining}
            </span>{" "}
            seconds
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Card.Title>
          <Card.Text className="question-text">{currentQuestion.question}</Card.Text>
          <div className="options-list">
            {["A", "B", "C", "D"].map((option, optionIndex) => {
              const optionText = currentQuestion[`option${option}`].trim();
              if (optionText !== "") {
                return (
                  <Button
                    key={optionIndex}
                    variant={
                      selectedAnswers[currentQuestion.id] === option
                        ? "primary"
                        : "outline-secondary"
                    }
                    className="option-btn"
                    onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                    disabled={quizCompleted || timeRemaining === 0}
                  >
                    {optionText}
                  </Button>
                );
              }
              return null;
            })}
          </div>
        </Card.Body>
        <Card.Footer>
          {!quizCompleted && timeRemaining > 0 && (
            <Button
              variant="primary"
              onClick={handleNextQuestion}
              className="next-btn"
            >
              Next Question
            </Button>
          )}
        </Card.Footer>
      </Card>
      <div className="action-buttons">
        {quizCompleted || timeRemaining === 0 ? (
          <Button variant="primary" onClick={handleSubmitQuiz}>
            Submit Answers
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Quiz;
