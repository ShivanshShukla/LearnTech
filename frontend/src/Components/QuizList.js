import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import"../Styles/QuizList.css"
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const QuizList = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });

    // Fetch subjects data from your API
    fetch("http://localhost:8082/api/subjects")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched subjects:", data);
        setSubjects(data);
      })
      .catch((error) => console.error("Error fetching subjects:", error));
  }, []);

  return (
    <Container className="quiz-list">
      <Row>
        {subjects.length === 0 ? (
          <p>No subjects available</p>
        ) : (
          subjects.map((subject, index) => (
            <Col key={index} sm={12} md={6} lg={4}>
              <Card className="subject-card" data-aos="fade-up">
                <Card.Body>
                  <Card.Title className="card-title">{subject.subject}</Card.Title>
                  <Card.Text className="card-text">Subject Code: {subject.subjectCode}</Card.Text>
                  <Card.Text className="card-text">Total Questions: {subject.totalQuestions}</Card.Text>
                  <Link to={`/quiz/${subject.subjectCode}`} className="btn btn-primary">
                    Start Quiz
                  </Link>
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
