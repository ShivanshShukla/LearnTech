import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "../Styles/Answer.css";

const Answer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedAnswers, questions, averageTime } = location.state || {};

  if (!selectedAnswers || !questions) {
    return (
      <p className="error-message">
        No quiz data available. Please start a quiz first.
      </p>
    );
  }

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const totalQuestions = questions.length;
  const percentageScore = ((score / totalQuestions) * 100).toFixed(2);

  return (
    <div className="answer-container">
      <Card className="result-card">
        <Card.Body>
          <Card.Title className="result-title">Quiz Results</Card.Title>
          <Card.Text className="result-text">
            You scored {score} out of {totalQuestions} ({percentageScore}%)
          </Card.Text>
          <Card.Text className="average-time">
            Average Time Per Question: {averageTime} seconds
          </Card.Text>
          <Button variant="primary" onClick={() => navigate("/quiz-list")}>
            Back to Quiz List
          </Button>
        </Card.Body>
      </Card>

      <div className="questions-container">
        {questions.map((question, index) => (
          <Card key={index} className="question-card">
            <Card.Body>
              <Card.Title className="question-title">
                Question {index + 1}
              </Card.Title>
              <Card.Text className="question-text">{question.question}</Card.Text>
              <div className="options-list">
                {["A", "B", "C", "D"].map((option) => {
                  const optionText = question[`option${option}`].trim();
                  if (optionText !== "") {
                    const isSelected = selectedAnswers[question.id] === option;
                    const isCorrect = question.correctAnswer === option;
                    let optionClass = "";

                    if (isSelected && isCorrect) {
                      optionClass = "correct";
                    } else if (isSelected && !isCorrect) {
                      optionClass = "incorrect";
                    } else if (!isSelected && isCorrect) {
                      optionClass = "highlight-correct";
                    }

                    return (
                      <div
                        key={option}
                        className={`option ${optionClass}`}
                      >
                        {option}. {optionText}
                        {isCorrect && !isSelected && (
                          <span className="correct-indicator">(Correct Answer)</span>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="explanation">
                Explanation: {question.explanation}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Answer;
