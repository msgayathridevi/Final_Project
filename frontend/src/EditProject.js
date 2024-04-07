import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditProject = () => {
    const [projectName, setProjectName] = useState('');
    const [years, setYears] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [skillsGained, setSkillsGained] = useState('');
    const [mentor, setMentor] = useState('');
    const [client, setClient] = useState('');


    const navigate = useNavigate();
    const { userId } = useParams();

    const resetForm = () => {
        setProjectName('');
        setYears(0);
        setStartDate('');
        setEndDate('');
        setProjectDescription('');
        setSkillsGained('');
        setMentor('');
        setClient('');
    };
    

    const fetchedSkills = {
        projectName, years, startDate, endDate, projectDescription,
        skillsGained, mentor, client
    };

    const onAddProject = () => {
        axios.post(`http://localhost:5000/addProject/${userId}`, fetchedSkills, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Project added successfully');
                    resetForm(); // Reset form fields
                    navigate(`/editProject/${userId}`);
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Project not added successfully');
            });
    };

    const onEditProject = () => {
        axios.post(`http://localhost:5000/editProject/${userId}`, fetchedSkills, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Project updated successfully');
                    resetForm(); // Reset form fields
                    navigate(`/editProject/${userId}`);
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Project not updated successfully');
            });
    };

    const onDeleteProject = () => {
        // Send request to delete skill to the backend
        axios.post(`http://localhost:5000/deleteProject/${userId}`, fetchedSkills, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Project deleted successfully');
                    resetForm(); // Reset form fields
                    navigate(`/editProject/${userId}`);
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Project not deleted successfully');
            });
    };

    return (
        <div>
            <header className="App-header">
                <h1>Edit Project</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onEditProject();
                }} className="project-form">
                    <div className="form-group">
                        <label htmlFor="projectName">Project Name:</label>
                        <input
                            type="text"
                            id="projectName"
                            name="projectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="years">Years:</label>
                        <input
                            type="number"
                            id="years"
                            name="years"
                            value={years}
                            onChange={(e) => setYears(parseInt(e.target.value))}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="projectDescription">Project Description:</label>
                        <textarea
                            id="projectDescription"
                            name="projectDescription"
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="skillsGained">Skills Gained:</label>
                            <select
                                id="skillsGained"
                                name="skillsGained"
                                value={skillsGained}
                                onChange={(e) => setSkillsGained(e.target.value)}
                                required
                            >
                                <option value="">Select Skill</option>
                                {['ADF', 'Alteryx', 'Angular', 'AWS', 'AWS Lambda', 'PHP', 'Power BI', 'Presenting', 'Project Mgmt', 'Python', 'React', 'React Native', 'Slides', 'Snowflake'].map(skill => (
                                    <option key={skill} value={skill}>{skill}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mentor">Mentor:</label>
                        <input
                            type="text"
                            id="mentor"
                            name="mentor"
                            value={mentor}
                            onChange={(e) => setMentor(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="client">Client:</label>
                        <input
                            type="text"
                            id="client"
                            name="client"
                            value={client}
                            onChange={(e) => setClient(e.target.value)}
                            required
                        />
                    </div>
                    <button type="button" onClick={onAddProject}>Add Project</button>
                    <button type="button" onClick={onEditProject}>Update Project</button>
                    <button type="button" onClick={onDeleteProject}>Delete Project</button>
                </form>
            </header>
            <button onClick={() => { localStorage.clear(); navigate('/') }}>Logout</button>

        </div>
    );
};

export default EditProject;
