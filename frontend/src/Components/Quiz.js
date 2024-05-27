import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, ProgressBar } from "react-bootstrap";
import "../Styles/Quiz.css";

const Quiz = () => {
  const { subjectCode } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (subjectCode) {
      const decodedSubjectCode = decodeURIComponent(subjectCode);
      fetch(
        `http://localhost:8082/api/questions?subjectCode=${decodedSubjectCode}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched questions:", data);
          const initialSelectedAnswers = {};
          data.forEach((question) => {
            initialSelectedAnswers[question.id] = null;
          });
          setSelectedAnswers(initialSelectedAnswers);
          setQuestions(data);
          setTimeRemaining(30);
          setQuizStarted(true);
        })
        .catch((error) => console.error("Error fetching questions:", error));
    } else {
      console.error("Subject code not found in route parameters");
    }
  }, [subjectCode]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const timer = setTimeout(() => {
        if (timeRemaining > 0) {
          setTimeRemaining(timeRemaining - 1);
        } else {
          handleNextQuestion();
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);

  useEffect(() => {
    const handleQuizEnd = () => {
      alert("Your test has ended.");
      navigate("/");
    };

    const handleWindowUnload = (event) => {
      if (quizStarted && !quizCompleted) {
        const confirmationMessage =
          "You have unsaved changes, are you sure you want to leave?";
        event.preventDefault();
        event.returnValue = confirmationMessage; // For legacy browsers
        return confirmationMessage; // For modern browsers
      } else {
        navigate("/");
      }
    };

    const handleVisibilityChange = () => {
      if (quizStarted && !quizCompleted && document.visibilityState === "hidden") {
        const confirmEnd = window.confirm(
          "You have switched tabs. Your test will be ended. Do you want to continue?"
        );
        if (confirmEnd) {
          handleQuizEnd();
        }
      }
    };

    window.addEventListener("beforeunload", handleWindowUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleWindowUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [quizStarted, quizCompleted, navigate]);

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
      setQuizCompleted(true);
    }
  };

  const handleSubmitQuiz = () => {
    console.log("Selected Answers:", selectedAnswers);
    setQuizCompleted(true);
    navigate("/answers", {
      state: {
        selectedAnswers,
        questions,
        totalQuestions: questions.length,
        completionTime: 30 - timeRemaining,
      },
    });
  };

  if (!Array.isArray(questions) || questions.length === 0) {
    return <p className="quiz-message">No questions available</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <ProgressBar
        now={progressPercentage}
        label={`${Math.floor(progressPercentage)}%`}
        className="custom-progress-bar"
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
          <Card.Text className="question-text">
            {currentQuestion.question}
          </Card.Text>
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
                    onClick={() =>
                      handleAnswerSelect(currentQuestion.id, option)
                    }
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
