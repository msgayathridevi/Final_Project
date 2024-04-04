import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [approvers, setApprovers] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [certificationDetails, setCertificationDetails] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/adminDashboard')
      .then(response => {
        setApprovers(response.data.approvers);
      })
      .catch(error => {
        console.error('Error fetching approvers:', error);
      });
  }, []);

  const fetchCertificationDetails = async (approvalName) => {
    try {
      const response = await axios.get(`http://localhost:5000/fetchCertificationDetailAdminDashboard/${approvalName}`);
      return response.data.driveLink;
    } catch (error) {
      console.error('Error fetching driveLink:', error);
      return '';
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const details = {};
      for (const approver of approvers) {
        const driveLink = await fetchCertificationDetails(approver.approval);
        details[approver.approval] = driveLink;
      }
      setCertificationDetails(details);
    };
    fetchDetails();
  }, [approvers]);

  const filteredApprovers = approvers.filter(approver => {
    if (filterStatus === 'All') {
      return true;
    } else {
      return approver.status === filterStatus;
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1> Admin Login Page</h1>
        <button style={{ opacity: 0.5, cursor: 'not-allowed' }} disabled>Dashboard</button>
        <Link to="/createemployee">
          <button>Create User</button>
        </Link>
        <Link to="/createapprover">
          <button>Create Approver</button>
        </Link>

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="approved">Approved</option>
          <option value="deny">Deny</option>
          <option value="pending">Pending</option>
        </select>

        <table>
          <thead>
            <tr>
              <th>Approver</th>
              <th>Approval</th>
              <th>Skills</th>
              <th>Certifications</th>
              <th>Projects</th>
              <th>Skills</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredApprovers.map(approver => (
              <tr key={approver._id}>
                <td>{approver.approver}</td>
                <td>{approver.approval}</td>
                <td>{approver.skills}</td>
                <td>{certificationDetails[approver.approval]}</td>
                <td></td>
                <td></td>
                <td>{approver.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
      <button onClick={() => { localStorage.clear(); navigate('/') }}>Logout</button>
    </div>
  );
}

export default Home;
