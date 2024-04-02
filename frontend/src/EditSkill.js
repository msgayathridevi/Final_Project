import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const EditSkill = () => {
    const [email, setEmail] = useState('');
    // const { skillId } = useParams();
    const { userId } = useParams(); 
    const [skillMode, setSkillMode] = useState('');
    const [skills, setSkills] = useState('');
    const [rateYourself, setRateYourself] = useState(0);
    const [driveLink, setDriveLink] = useState('');

    const onFormSubmit = () => {
        // Send updated skill data to the backend
        const updatedSkill = { email, skillMode, skills, rateYourself, driveLink };
        axios.post(`http://localhost:5000/editSkill/${userId}`, updatedSkill)
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
                        <select
                            id="skillMode"
                            name="skillMode"
                            value={skillMode}
                            onChange={(e) => setSkillMode(e.target.value)}
                            required
                        >
                            <option value="">Select Skill Mode</option>
                            <option value="youtube">YouTube</option>
                            <option value="personalProjects">Personal Projects</option>
                            <option value="previouslyGained">Previously Gained</option>
                            <option value="collaborativeLearning">Collaborative Learning</option>
                        </select>
                    </div>
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
