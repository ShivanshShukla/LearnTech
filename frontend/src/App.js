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
import Quiz from "./Components/Quiz";

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
            <Route path="/quiz" element={<Quiz />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
