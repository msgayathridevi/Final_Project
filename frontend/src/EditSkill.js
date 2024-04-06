import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditSkill = () => {
    const [skillMode, setSkillMode] = useState('');
    const [skills, setSkills] = useState('');
    const [rateYourself, setRateYourself] = useState(0);
    const [driveLink, setDriveLink] = useState('');


    const navigate = useNavigate();
    const { userId } = useParams();
    // console.log('userId: in editskills', userId);

    // const onFormSubmit = () => {
    //     // Send updated skill data to the backend
    //     const updatedSkill = { skillMode, skills, rateYourself, driveLink };
    //     axios.post(`http://localhost:5000/editSkill/${userId}`, updatedSkill, {
    //         headers: {
    //             Authorization: "Bearer " + localStorage.getItem("token"),
    //         },
    //     })

    //         .then((res) => {
    //             if (res.status === 200) {
    //                 alert('Skill updated successfully' + userId);
    //             }
    //             // console.log(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             alert('Skill not updated successfully');
    //         });
    // };

    const resetForm = () => {
        setSkillMode('');
        setSkills('');
        setRateYourself(0);
        setDriveLink('');
    };

    const fetchedSkills = { skillMode, skills, rateYourself, driveLink };
    const onAddSkill = () => {
        axios.post(`http://localhost:5000/addSkill/${userId}`, fetchedSkills, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Skill added successfully');
                    resetForm(); // Reset form fields
                    navigate(`/editSkill/${userId}`);
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Skill not added successfully');
            });
    };

    const onEditSkill = () => {
        axios.post(`http://localhost:5000/editSkill/${userId}`, fetchedSkills, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Skill updated successfully');
                    resetForm(); // Reset form fields
                    navigate(`/editSkill/${userId}`);
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Skill not updated successfully');
            });
    };

    const onDeleteSkill = () => {
        // Send request to delete skill to the backend
        axios.post(`http://localhost:5000/deleteSkill/${userId}`, fetchedSkills, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Skill deleted successfully');
                    resetForm(); // Reset form fields
                    navigate(`/editSkill/${userId}`);
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Skill not deleted successfully');
            });
    };

    return (
        <div>
            <header className="App-header">
                <h1>Edit Skill</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    // onFormSubmit();
                    onEditSkill();
                }} className="skill-form">
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
                            {['ADF', 'Alteryx', 'Angular', 'AWS', 'AWS Lambda', 'PHP', 'Power BI', 'Presenting', 'Project Mgmt', 'Python', 'React', 'React Native', 'Slides', 'Snowflake'].map(skill => (
                                <option key={skill} value={skill}>{skill}</option>
                            ))}
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
                    <button type="button" onClick={onAddSkill}>Add Skill</button>
                    <button type="button" onClick={onEditSkill}>Update Skill</button>
                    <button type="button" onClick={onDeleteSkill}>Delete Skill</button>
                </form>
            </header>
            <button onClick={() => { localStorage.clear(); navigate('/') }}>Logout</button>

        </div>
    );
};

export default EditSkill;
