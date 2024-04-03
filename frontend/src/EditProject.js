import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProject = () => {
    const [email, setEmail] = useState('');
    const [projectName, setProjectName] = useState('');
    const [years, setYears] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [skillsGained, setSkillsGained] = useState('');
    const [mentor, setMentor] = useState('');
    const [client, setClient] = useState('');

    
  const navigate = useNavigate();

    const onFormSubmit = () => {
        const updatedProject = {
            email,
            projectName,
            years,
            startDate,
            endDate,
            projectDescription,
            skillsGained,
            mentor,
            client
        };

        axios.post(`http://localhost:5000/editProject`, updatedProject, {
            headers:{
               Authorization:"Bearer "+localStorage.getItem("token"),
             },
           })
            .then((res) => {
                if (res.status === 200) {
                    alert('Project updated successfully');
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
                <h1>Edit Project</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onFormSubmit();
                }} className="project-form">
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
                                <option value="">Select Skills Gained</option>
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
                    <button type="submit">Update Project</button>
                </form>
            </header>
            <button onClick={() => navigate('/')}>Logout</button>

        </div>
    );
};

export default EditProject;
