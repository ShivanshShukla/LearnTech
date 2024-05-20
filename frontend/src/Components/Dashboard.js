import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const studentData = localStorage.getItem('student');
    if (studentData) {
      const student = JSON.parse(studentData);
      setFirstName(student.firstName);
    }
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
