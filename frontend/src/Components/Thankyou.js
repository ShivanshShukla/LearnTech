import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ThankYou.module.css'

const ThankYou = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="card shadow-lg p-4">
          <div className="card-body">
            <h1 className="card-title display-4">Thank You!</h1>
            <p className="card-text lead">
              We appreciate your effort and contribution. You have successfully completed the registration.
            </p>
            <p className="card-text">
              <em>Your journey with us begins now. Together, let's achieve greatness!</em>
            </p>
            <Link to="/" className="btn btn-primary mt-3">Go to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
