import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';

function CreateUser() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate(); // Define the navigate function using useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/user/api/createuser',
      {name, email, password, role, age});
      console.log(response.status);

      if (response.status === 201){
        alert('User created successfully');
        navigate("/home"); // Use the navigate function here
      } else {
        alert('User creation failed');
      }
    } catch (error){
      console.error("Error : ", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={e=>setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={e=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={e=>setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              name="role"
              onChange={e=>setRole(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              id="age"
              name="age"
              onChange={e=>setAge(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create User</button>
        </form>
      </header>
    </div>
  );
}

export default CreateUser;
