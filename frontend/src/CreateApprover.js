import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateApprover() {
  const [approvers, setApprovers] = useState([]);
  const [approver, setApprover] = useState('');
  const [approvals, setApprovals] = useState([]);
  const [approval, setApproval] = useState('');
  const [skills, setSkills] = useState('');

  
  const navigate = useNavigate();
  
  const allSkills = ['ADF', 'Alteryx', 'Angular', 'AWS', 'AWS Lambda', 'PHP', 'Power BI', 'Presenting', 'Project Mgmt', 'Python', 'React', 'React Native', 'Slides', 'Snowflake'];

  useEffect(() => {
    // Fetch approvers and approvals from backend
    axios.get('http://localhost:5000/approvers')
      .then(response => {
        // console.log(response.data);
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
        skills
      };

      const response = await axios.post('http://localhost:5000/createapprover', newApprover, {
        headers:{
           Authorization:"Bearer "+localStorage.getItem("token"),
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
    <div>
    <form onSubmit={handleSubmit} >
      <label htmlFor="approver">Approver:</label>
      <select id="approver" value={approver} onChange={(e) => setApprover(e.target.value)}>
        <option value="" disabled>Select Approver</option>
        {approvers?.map((approver, i) => (
          <option key={i} value={approver.name}>{approver.name}</option>
        ))}
      </select>

      <label htmlFor="approval">Approval:</label>
      <select id="approval" value={approval} onChange={(e) => setApproval(e.target.value)}>
        <option value="" disabled>Select Approval</option>
        {approvals?.map((approval, i) => (
          <option key={i} value={approval.name}>{approval.name}</option>
        ))}
      </select>

      <label htmlFor="skills">Skills:</label>
      <select id="skills" value={skills} onChange={(e) => setSkills(e.target.value)}>
        <option value="" disabled>Select Skills</option>
        {allSkills.map(skills => (
          <option key={skills} value={skills}>{skills}</option>
        ))}
      </select>

      <button type="submit">Save</button>
      </form>
      <button onClick={() => navigate('/')}>Logout</button>

    </div>
  );
}

export default CreateApprover;
