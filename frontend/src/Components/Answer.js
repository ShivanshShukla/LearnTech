import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import "../Styles/Answer.css";

const Answer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    selectedAnswers,
    questions,
    averageTime,
    emailId,
    completionTime,
    timeSpent,
  } = location.state || {};

  const calculateMetrics = () => {
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let skippedQuestions = 0;
    let totalResponseTime = 0;
    let difficultySum = 0;

    if (questions && selectedAnswers) {
      questions.forEach((question) => {
        const selectedAnswer = selectedAnswers[question.id];
        if (!selectedAnswer) {
          skippedQuestions++;
        } else {
          if (selectedAnswer === question.correctAnswer) {
            correctAnswers++;
          } else {
            incorrectAnswers++;
          }
        }
        totalResponseTime += timeSpent[question.id] || 0;
        difficultySum += parseInt(question.difficulty, 10); // assuming difficulty is a number
      });
    }

    const totalQuestions = questions ? questions.length : 0;
    const attemptedQuestions = totalQuestions - skippedQuestions;
    const accuracy = ((correctAnswers / attemptedQuestions) * 100).toFixed(2);
    const averageResponseTime = (totalResponseTime / totalQuestions).toFixed(2);
    const timePerQuestion = (totalResponseTime / attemptedQuestions).toFixed(2);
    const averageDifficulty = (difficultySum / totalQuestions).toFixed(2);

    return {
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      skippedQuestions,
      accuracy,
      averageResponseTime,
      timePerQuestion,
      completionTime,
      timeSpent,
      averageDifficulty,
    };
  };

  const metrics = calculateMetrics();

  const submitQuizData = async () => {
    const quizData = {
      emailId,
      ...metrics,
    };

    try {
      const response = await axios.post(
        "http://your-api-gateway-url/submit-quiz",
        quizData
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    if (selectedAnswers && questions) {
      submitQuizData();
    }
  }, [selectedAnswers, questions]);

  if (!selectedAnswers || !questions) {
    return (
      <p className="error-message">
        No quiz data available. Please start a quiz first.
      </p>
    );
  }

  return (
    <div className="answer-container">
      <Card className="result-card">
        <Card.Body>
          <Card.Title className="result-title">Quiz Results</Card.Title>
          <Card.Text className="result-text">
            You scored {metrics.correctAnswers} out of {metrics.totalQuestions}{" "}
            ({metrics.accuracy}%)
          </Card.Text>
          <Card.Text className="average-time">
            Average Time Per Question: {metrics.averageResponseTime} seconds
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
              <Card.Text className="question-text">
                {question.question}
              </Card.Text>
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
                      <div key={option} className={`option ${optionClass}`}>
                        {option}. {optionText}
                        {isCorrect && !isSelected && (
                          <span className="correct-indicator">
                            (Correct Answer)
                          </span>
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
