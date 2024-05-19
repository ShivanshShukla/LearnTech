import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const fetchFirstName = async () => {
      try {
        const response = await axios.get('http://localhost:8080/learntech/students/get-first-name', {
          withCredentials: true 
        });
        setFirstName(response.data);
      } catch (error) {
        console.error('Error fetching first name:', error);
      }
    };

    fetchFirstName();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Welcome </h3>
            </div>
            <div className="card-body">
              <p className="h4">{firstName}!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
