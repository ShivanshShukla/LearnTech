// Navbar.js

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("student");

  const handleLogout = async () => {
    const student = JSON.parse(localStorage.getItem("student"));
    if (student) {
      try {
        await axios.post("http://localhost:8081/learntech/students/logout", {
          studentId: student.id,
        });
        // Clear localStorage
        localStorage.removeItem("student");
        // Navigate to home page
        navigate("/");
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  const handleQuizRedirect = () => {
    navigate("/quizlist");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          My App
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                className="nav-link"
                activeClassName="active"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about-us"
                className="nav-link"
                activeClassName="active"
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className="nav-link"
                activeClassName="active"
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/quiz-list" // Update to /quizlist
                className="nav-link"
                activeClassName="active"
                onClick={handleQuizRedirect}
              >
                QuizList
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/dashboard"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="btn btn-primary">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/signup"
                    className="btn btn-outline-primary ms-2"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
