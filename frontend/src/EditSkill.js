import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

const EditSkill = () => {
    const [email, setEmail] = useState('');
    // const { skillId } = useParams();
    const [skillMode, setSkillMode] = useState('');
    const [skills, setSkills] = useState('');
    const [rateYourself, setRateYourself] = useState(0);
    const [driveLink, setDriveLink] = useState('');

    useEffect(() => {
        // Fetch skill data from the backend when the component mounts
        axios.get(`http://localhost:5000/editSkill`)
            .then((res) => {
                const { skillMode, skills, rateYourself, driveLink } = res.data;
                setSkillMode(skillMode);
                setSkills(skills);
                setRateYourself(rateYourself);
                setDriveLink(driveLink);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    const onFormSubmit = () => {
        // Send updated skill data to the backend
        const updatedSkill = { email, skillMode, skills, rateYourself, driveLink };
        axios.put(`http://localhost:5000/editSkill`, updatedSkill)
            .then((res) => {
                if (res.status === 200) {
                    alert('Skill updated successfully');
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
                <h1>Edit Skill</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onFormSubmit();
                }} className="skill-form">
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
                        <label htmlFor="skillMode">Skill Mode:</label>
                        <input
                            type="text"
                            id="skillMode"
                            name="skillMode"
                            value={skillMode}
                            onChange={(e) => setSkillMode(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="skills">Skills:</label>
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rateYourself">Rate Yourself (1-5):</label>
                        <input
                            type="number"
                            id="rateYourself"
                            name="rateYourself"
                            value={rateYourself}
                            onChange={(e) => setRateYourself(parseInt(e.target.value))}
                            min="1"
                            max="5"
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
                    <button type="submit">Update Skill</button>
                </form>
            </header>
        </div>
    );
};

export default EditSkill;
