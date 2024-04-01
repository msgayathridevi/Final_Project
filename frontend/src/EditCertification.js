import axios from 'axios';
import React, { useState } from 'react';

const EditCertification = () => {
    const [email, setEmail] = useState('');
    const [driveLink, setDriveLink] = useState('');
    const [organization, setOrganization] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [durationInWeeks, setDurationInWeeks] = useState(0);
    const [skills, setSkills] = useState('');

    const onFormSubmit = () => {
        const updatedCertification = {
            email,
            driveLink,
            organization,
            expireDate,
            issueDate,
            durationInWeeks,
            skills
        };

        axios.post('http://localhost:5000/editCertification', updatedCertification)
            .then((res) => {
                if (res.status === 200) {
                    alert('Certification updated successfully');
                }
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <header className="App-header">
                <h1>Edit Certification</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onFormSubmit();
                }} className="certification-form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
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
                                <option value="python">Python</option>
                                <option value="Advanced python">Advanced Python</option>
                                <option value="cloud">Cloud</option>
                                <option value="dbt">DBT</option>
                                <option value="Full Stack">Full Stack</option>
                                <option value="powerBI">PowerBI</option>
                                <option value="tableau">Tableau</option>
                                <option value="Redux">Redux</option>
                                <option value="JWT">JWT</option>
                            </select>
                        </div>

                    </div>
                    <button type="submit">Update Certification</button>
                </form>
            </header>
        </div>
    );
};

export default EditCertification;
