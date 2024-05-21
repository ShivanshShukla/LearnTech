import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("student");

  const handleLogout = async () => {
    const student = JSON.parse(localStorage.getItem("student"));
    if (student) {
      try {
        await axios.post("http://localhost:8080/learntech/students/logout", {
          studentId: student.id,
        });
        localStorage.removeItem("student");
        navigate("/");
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/about-us"
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item mt-1 me-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/dashboard"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="btn btn-primary w-100"
                    id="login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/signup"
                    className="btn btn-outline-primary w-100"
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
