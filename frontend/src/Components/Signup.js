import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css";

const countryOptions = [
  { value: "+1", label: "United States (+1)" },
  { value: "+91", label: "India (+91)" },
  { value: "+44", label: "United Kingdom (+44)" },
  // Add more country codes as needed
];

const Signup = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Sign Up</h3>
            </div>
            <div className="card-body">
              <form id="signup-form">
                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group merged-fields d-flex">
                  <div className="form-group flex-fill me-2">
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <div className="input-group">
                      <Select
                        options={countryOptions}
                        className="form-control col-3 p-0"
                        id="countryCode"
                        name="countryCode"
                        placeholder="Code"
                        value={selectedCountryCode}
                        onChange={setSelectedCountryCode}
                        required
                      />
                      <input
                        type="tel"
                        className="form-control col-9"
                        id="contactNumber"
                        name="contactNumber"
                        placeholder="1234567890"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group flex-fill ms-2">
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender:</label>
                  <div className="input-group">
                    <select
                      className="form-control"
                      id="gender"
                      name="gender"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Re-enter Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    required
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terms"
                    name="terms"
                    required
                  />
                  <label className="form-check-label" htmlFor="terms">
                    By signing up you agree to our{" "}
                    <a href="/terms">Terms of Service</a> and{" "}
                    <a href="/privacy">Privacy Policy</a>
                  </label>
                </div>
                <button
                  id="submitbtn"
                  type="submit"
                  className="btn btn-primary"
                >
                  Sign Up
                </button>
                <div class="d-flex align-items-center justify-content-center mt-4">
                  <p className="">Or sign up with</p>
                </div>
                <div className="mt-3 text-center buttons">
                  <button type="button" className="btn btn-danger mr-2">
                    <i className="fab fa-google"></i> Google
                  </button>
                  <button type="button" className="btn btn-primary mr-2">
                    <i class="fa-brands fa-facebook"></i> Facebook
                  </button>
                  <button type="button" className="btn btn-dark">
                    <i className="fab fa-github"></i> GitHub
                  </button>
                </div>
                <div className="mt-3 text-center">
                  <p>
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={() => navigate("/login")}
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <script
        src="https://kit.fontawesome.com/331595806a.js"
        crossorigin="anonymous"
      ></script>
    </div>
  );
};

export default Signup;
