import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";
import "../Styles/QuizList.css";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const QuizList = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });

    // Fetch subjects data from your API
    fetch("http://localhost:8082/api/subjects")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched subjects:", data);

        // Sort subjects alphabetically by subject name
        const sortedData = data.sort((a, b) => {
          const subjectA = a.subject.toUpperCase();
          const subjectB = b.subject.toUpperCase();
          if (subjectA < subjectB) {
            return -1;
          }
          if (subjectA > subjectB) {
            return 1;
          }
          return 0;
        });

        setSubjects(sortedData);
      })
      .catch((error) => console.error("Error fetching subjects:", error));
  }, []);

  const handleStartQuiz = (subjectCode) => {
    // Check if the user is logged in
    const loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn) {
      // If not logged in, save the intended path and redirect to login
      localStorage.setItem("intendedPath", `/quiz/${subjectCode}`);
      navigate("/login");
    } else {
      // If logged in, proceed to start the quiz
      navigate(`/quiz/${subjectCode}`);
    }
  };

  return (
    <Container className="quiz-list">
      <h1 className="quiz-list-title">Available Quizzes</h1>
      <Row>
        {subjects.length === 0 ? (
          <p>No subjects available</p>
        ) : (
          subjects.map((subject, index) => (
            <Col key={index} sm={12} md={6} lg={4}>
              <Card className="subject-card" data-aos="fade-up">
                <Card.Body>
                  <Card.Title className="card-title">{subject.subject}</Card.Title>
                  <Card.Text className="card-text">
                    Subject Code: {subject.subjectCode}
                  </Card.Text>
                  <Card.Text className="card-text">
                    Total Questions: {subject.totalQuestions}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleStartQuiz(subject.subjectCode)}
                  >
                    Start Quiz
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default QuizList;
