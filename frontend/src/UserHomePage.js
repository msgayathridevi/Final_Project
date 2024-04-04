import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { userId } = useParams();
  const [isApprover, setIsApprover] = useState(false);
  const [approvals, setApprovals] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [approvalSkillsskills, setapprovalSkillsskills] = useState();
  const [approvalSkillsskillMode, setapprovalSkillsskillMode] = useState();
  const [approvalSkillsskillRateYourself, setapprovalSkillsskillRateYourself] = useState();
  const [approvalSkillsskillDriveLink, setapprovalSkillsskillDriveLink] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/fetchuserapprovals/${userId}`)
      .then(response => {
        setIsApprover(response.data.isApprover);
        if (response.data.approvals) {
          setApprovals(response.data.approvals);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);


  const handleViewDetails = (approval) => {
    // console.log("view details approval: " + approval);
    axios.post(`http://localhost:5000/fetchApprovalSkills`, { approval }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(response => {
        // console.log("Frontend response:", response);
        // console.log("skillmode"+response.data.data[0].skillMode)
        setapprovalSkillsskills(response.data.data[0].skills);
        setapprovalSkillsskillMode(response.data.data[0].skillMode);
        setapprovalSkillsskillRateYourself(response.data.data[0].rateYourself);
        setapprovalSkillsskillDriveLink(response.data.data[0].driveLink);
        setShowDetails(true);
      })
      .catch(error => {
        console.error('Error fetching approval skills:', error);
      });
  };


  const handleUpdateStatus = (approval) => {
    // Prompt the user to select an option
    const status = prompt("Enter status (approved/deny):");

    // Validate the status input
    if (status !== "approved" && status !== "deny") {
      alert("Invalid status input. Please enter 'approved' or 'deny'.");
      return;
    }

    // Send the data to the backend
    axios.post(`http://localhost:5000/updateApprovalStatus`, { userId, approval, status }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(response => {
        alert("Status updated successfully");
      })
      .catch(error => {
        console.error('Error updating approval status:', error);
        alert("An error occurred while updating the status. Please try again.");
      });
  };

  
  // console.log(isApprover);

  return (
    <div>
      <h1>Welcome User Home Page</h1>
      <div>
        <Link to={`/editSkill/${userId}`}>
          <button>Edit Your Skills</button>
        </Link>
      </div>
      <div>
        <Link to={`/editCertification/${userId}`}>
          <button>Edit Your Certifications</button>
        </Link>
      </div>
      <div>
        <Link to={`/editProject/${userId}`}>
          <button>Edit Your Projects</button>
        </Link>
      </div>


      {isApprover ? (
        <div>
          <h1>User is an Approver</h1>
          <h2>Pending Approvals:</h2>
          {approvals.length > 0 ? (
            <ul>
              {approvals
                .filter(approval => approval.status === "pending")
                .map(approval => (
                  <li key={approval._id}>
                    <p>Approval: {approval.approval}</p>
                    <p>Skills: {approval.skills}</p>
                    <p>Status: {approval.status}</p>
                    <button onClick={() => handleViewDetails(approval.approval)}>View Details</button>
                    {showDetails && (
                      <div>
                        <p style={{ fontWeight: 'bold' }}>Skill Details</p>

                        <p>Skills: {approvalSkillsskills}</p>
                        <p>Skill Mode: {approvalSkillsskillMode}</p>
                        <p>Rate Yourself: {approvalSkillsskillRateYourself}</p>
                        <p>
                          Drive Link:{" "}
                          <a href={approvalSkillsskillDriveLink} target="_blank" rel="noopener noreferrer">
                            {approvalSkillsskillDriveLink}
                          </a>
                        </p>

                      </div>
                    )}


                    <button onClick={() => handleUpdateStatus(approval.approval)}>Update Status</button>

                  </li>
                ))}
            </ul>
          ) : (
            <p>No pending approvals found</p>
          )}
        </div>

      ) : (
        <div>
          <h1>User is not an Approver</h1>
        </div>
      )}
      <button onClick={() => { localStorage.clear(); localStorage.removeItem('token'); navigate('/') }}>Logout</button>

    </div>
  );
}

export default HomePage;
