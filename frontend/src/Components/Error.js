import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ErrorPage.module.css';

const ErrorPage = () => {
  return (
    <div className="error-page d-flex flex-column align-items-center justify-content-center text-center">
      <h1 className="display-1 text-danger">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="lead">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
