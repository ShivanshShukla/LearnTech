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

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Signup = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    contact: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First name is required";
    if (!formData.lastName) tempErrors.lastName = "Last name is required";
    if (!formData.emailId) tempErrors.emailId = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    if (formData.password && !passwordRegex.test(formData.password))
      tempErrors.password =
        "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character";
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";
    if (!formData.dateOfBirth)
      tempErrors.dateOfBirth = "Date of Birth is required";
    if (!selectedCountryCode)
      tempErrors.countryCode = "Country code is required";
    if (!formData.contact) tempErrors.contact = "Contact number is required";
    // if (isNaN(formData.contact.value)) tempErrors.contact="Contact number should be numeric";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const student = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailId: formData.emailId,
      password: formData.password,
      dateOfBirth: formData.dateOfBirth,
      countryCode: selectedCountryCode ? selectedCountryCode.value : "",
      contact: formData.contact,
      gender: formData.gender,
    };

    try {
      const response = await fetch("http://localhost:8081/learntech/students/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        const result = await response.text();
        console.log("Success:", result);
        navigate("/thankyou");
      } else if (response.status === 409) {
        console.error("Conflict: Student with this email already exists");
        setErrors({ emailId: "Student with this email already exists" });
      } else if (response.status === 403) {
        console.error("Forbidden: Origin not allowed");
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Sign Up</h3>
            </div>
            <div className="card-body">
              <form id="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  {errors.firstName && (
                    <div className="alert alert-danger">{errors.firstName}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  {errors.lastName && (
                    <div className="alert alert-danger">{errors.lastName}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="emailId">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    placeholder="Enter your email"
                    value={formData.emailId}
                    onChange={handleChange}
                    required
                  />
                  {errors.emailId && (
                    <div className="alert alert-danger">{errors.emailId}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && (
                    <div className="alert alert-danger">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Re-enter Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {errors.confirmPassword && (
                    <div className="alert alert-danger">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                  {errors.dateOfBirth && (
                    <div className="alert alert-danger">
                      {errors.dateOfBirth}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="countryCode">Country Code</label>
                  <Select
                    options={countryOptions}
                    className="form-control p-0"
                    id="countryCode"
                    name="countryCode"
                    placeholder="Select your country code"
                    value={selectedCountryCode}
                    onChange={setSelectedCountryCode}
                    required
                  />
                  {errors.countryCode && (
                    <div className="alert alert-danger">
                      {errors.countryCode}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="contact">Contact Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="contact"
                    name="contact"
                    placeholder="Enter your contact number"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                  {errors.contact && (
                    <div className="alert alert-danger">{errors.contact}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    className="form-control"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <div className="alert alert-danger">{errors.gender}</div>
                  )}
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
                <div className="text-danger">
                  {errors.terms && <div>{errors.terms}</div>}
                </div>
                <button
                  id="submitbtn"
                  type="submit"
                  className="btn btn-primary"
                >
                  Sign Up
                </button>
                <div className="d-flex align-items-center justify-content-center mt-4">
                  <p className="">Or sign up with</p>
                </div>
                <div className="mt-3 text-center buttons">
                  <button type="button" className="btn btn-danger mr-2">
                    <i className="fab fa-google"></i> Google
                  </button>
                  <button type="button" className="btn btn-primary mr-2">
                    <i className="fa-brands fa-facebook"></i> Facebook
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
        crossOrigin="anonymous"
      ></script>
    </div>
  );
};

export default Signup;
