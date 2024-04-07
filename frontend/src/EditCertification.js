import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditCertification = () => {
    const [driveLink, setDriveLink] = useState('');
    const [organization, setOrganization] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [durationInWeeks, setDurationInWeeks] = useState(0);
    const [skills, setSkills] = useState('');

    const navigate = useNavigate();
    const { userId } = useParams();

    const resetForm = () => {
        setDriveLink('');
        setOrganization('');
        setExpireDate('');
        setIssueDate('');
        setDurationInWeeks(0);
        setSkills('');
    };

    const fetchedCertification = {
        driveLink, organization, expireDate,
        issueDate, durationInWeeks, skills
    };
    const onAddCertification = () => {
        axios.post(`http://localhost:5000/addCertification/${userId}`, fetchedCertification, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Certification added successfully');
                    resetForm(); // Reset form fields
                    navigate(`/editCertification/${userId}`);
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Certification not added successfully');
            });
    };

    const onEditCertification = () => {
        axios.post(`http://localhost:5000/editCertification/${userId}`, fetchedCertification, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Certification updated successfully');
                    resetForm(); // Reset form fields
                    navigate(`/editCertification/${userId}`);
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Certification not updated successfully');
            });
    };

    const onDeleteCertification = () => {
        // Send request to delete certification to the backend
        axios.post(`http://localhost:5000/deleteCertification/${userId}`, fetchedCertification, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Certification deleted successfully');
                    resetForm(); // Reset form fields
                    navigate(`/editCertification/${userId}`);
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Certification not deleted successfully');
            });
    };

    return (
        <div>
            <header className="App-header">
                <h1>Edit Certification</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onEditCertification();
                }} className="certification-form">

                    <div className="form-group">
                        <label htmlFor="driveLink">Drive Link:</label>
                        <input
                            type="text"
                            id="driveLink"
                            name="driveLink"
                            value={driveLink}
                            onChange={(e) => setDriveLink(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="organization">Organization:</label>
                        <input
                            type="text"
                            id="organization"
                            name="organization"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expireDate">Expire Date:</label>
                        <input
                            type="date"
                            id="expireDate"
                            name="expireDate"
                            value={expireDate}
                            onChange={(e) => setExpireDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="issueDate">Issue Date:</label>
                        <input
                            type="date"
                            id="issueDate"
                            name="issueDate"
                            value={issueDate}
                            onChange={(e) => setIssueDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="durationInWeeks">Duration (in weeks):</label>
                        <input
                            type="number"
                            id="durationInWeeks"
                            name="durationInWeeks"
                            value={durationInWeeks}
                            onChange={(e) => setDurationInWeeks(parseInt(e.target.value))}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="skills">Skills:</label>
                            <select
                                id="skills"
                                name="skills"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                required
                            >
                                <option value="">Select Skill</option>
                                {['ADF', 'Alteryx', 'Angular', 'AWS', 'AWS Lambda', 'PHP', 'Power BI', 'Presenting', 'Project Mgmt', 'Python', 'React', 'React Native', 'Slides', 'Snowflake'].map(skill => (
                                    <option key={skill} value={skill}>{skill}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <button type="button" onClick={onAddCertification}>Add Certification</button>
                    <button type="button" onClick={onEditCertification}>Update Certification</button>
                    <button type="button" onClick={onDeleteCertification}>Delete Certification</button>

                </form>
            </header>
            <button onClick={() => { localStorage.clear(); navigate('/') }}>Logout</button>

        </div>
    );
};

export default EditCertification;
