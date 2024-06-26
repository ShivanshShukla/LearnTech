import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Contactus from "./Components/Contactus";
import About from "./Components/About";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ThankYou from "./Components/Thankyou";
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer";
import ErrorPage from "./Components/Error";
import QuizList from "./Components/QuizList";
import Quiz from "./Components/Quiz";
import Answer from "./Components/Answer";


function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/quiz-list" element={<QuizList />} />
            <Route path="/quiz/:subjectCode" element={<Quiz />} />
            <Route path="/answers" element={<Answer />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
