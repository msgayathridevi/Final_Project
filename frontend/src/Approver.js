import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Approver() {
  const [approvers, setApprovers] = useState([]);
  const [approver, setApprover] = useState('');
  const [approvals, setApprovals] = useState([]);
  const [approval, setApproval] = useState('');
  const [skill, setSkill] = useState('');
  const [status, setStatus] = useState('');

  const allSkills = ['python', 'Advanced python', 'cloud', 'dbt', 'Full Stack', 'powerBI', 'tableau', 'Redux', 'JWT'];

  useEffect(() => {
    // Fetch approvers and approvals from backend
    axios.get('http://localhost:5000/approvers')
      .then(response => {
        setApprovers(response.data.approvers);
      })
      .catch(error => {
        console.error('Error fetching approvers:', error);
      });

    axios.get('http://localhost:5000/approvals')
      .then(response => {
        setApprovals(response.data.approvals);
      })
      .catch(error => {
        console.error('Error fetching approvals:', error);
      });
  }, []);

  return (
    <div>
      <label htmlFor="approver">Approver:</label>
      <select id="approver" value={approver} onChange={(e) => setApprover(e.target.value)}>
        <option value="">Select Approver</option>
        {approvers.map(approver => (
          <option key={approver.id} value={approver.name}>{approver.name}</option>
        ))}
      </select>

      <label htmlFor="approval">Approval:</label>
      <select id="approval" value={approval} onChange={(e) => setApproval(e.target.value)}>
        <option value="">Select Approval</option>
        {approvals.map(approval => (
          <option key={approval.id} value={approval.name}>{approval.name}</option>
        ))}
      </select>

      <label htmlFor="skill">Skill:</label>
      <select id="skill" value={skill} onChange={(e) => setSkill(e.target.value)}>
        <option value="">Select Skill</option>
        {allSkills.map(skill => (
          <option key={skill} value={skill}>{skill}</option>
        ))}
      </select>

      <label htmlFor="status">Status:</label>
      <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="approved">Approved</option>
        <option value="deny">Deny</option>
        <option value="pending">Pending</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
}

export default Approver;
