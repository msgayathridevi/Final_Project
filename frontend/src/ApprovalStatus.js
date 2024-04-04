import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Approver() {
  const [approvers, setApprovers] = useState([]);
  const [approver, setApprover] = useState('');
  const [approvals, setApprovals] = useState([]);
  const [approval, setApproval] = useState('');
  const [skills, setSkills] = useState('');
  const [status, setStatus] = useState('');

  const allSkills = ['ADF', 'Alteryx', 'Angular', 'AWS', 'AWS Lambda', 'PHP', 'Power BI', 'Presenting', 'Project Mgmt', 'Python', 'React', 'React Native', 'Slides', 'Snowflake'];

  useEffect(() => {
    // Fetch approvers and approvals from backend
    axios.get('http://localhost:5000/approvers')
      .then(response => {
        console.log(response.data);
        setApprovers(response.data);
      })
      .catch(error => {
        console.error('Error fetching approvers:', error);
      });

    axios.get('http://localhost:5000/approvals')
      .then(response => {
        setApprovals(response.data);
      })
      .catch(error => {
        console.error('Error fetching approvals:', error);
      });
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newApprover = {
        approver,
        approval,
        skills,
        status
      };

      const response = await axios.post('http://localhost:5000/createapprover', newApprover, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status === 201) {
        alert('New Approver created successfully');
      } else {
        alert('New Approver creation failed');
      }
    } catch (error) {
      console.error('Error creating approver:', error);
      alert('An error occurred while creating the approver. Please try again.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label htmlFor="approver">Approver:</label>
          <select className="form-control" id="approver" value={approver} onChange={(e) => setApprover(e.target.value)}>
            <option value="" disabled>Select Approver</option>
            {approvers?.map((approver, i) => (
              <option key={i} value={approver.name}>{approver.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="approval">Approval:</label>
          <select className="form-control" id="approval" value={approval} onChange={(e) => setApproval(e.target.value)}>
            <option value="" disabled>Select Approval</option>
            {approvals?.map((approval, i) => (
              <option key={i} value={approval.name}>{approval.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills:</label>
          <select className="form-control" id="skills" value={skills} onChange={(e) => setSkills(e.target.value)}>
            <option value="" disabled>Select Skills</option>
            {allSkills.map(skills => (
              <option key={skills} value={skills}>{skills}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select className="form-control" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="" disabled>Select Status</option>
            <option value="approved">Approved</option>
            <option value="deny">Deny</option>
            <option value="pending">Pending</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>
      <button className="btn btn-secondary" onClick={() => { localStorage.clear(); navigate('/') }}>Logout</button>
    </div>
  );
}

export default Approver;
