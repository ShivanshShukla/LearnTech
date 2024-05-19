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


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
