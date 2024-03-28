import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '', // New field
    email: '',
    password: '',
    role: '', // New field
    age: '', // New field
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send credentials to backend for validation (using fetch or an HTTP library)
      const response = await fetch('http://localhost:5000/user/api/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log(response);
      const data = await response.json();

      if (data.success) {
        setMessage('User created successful!');
        // Handle successful login (e.g., store user data, redirect to home)
        navigate("/home");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(credentials)
      console.error('Error:', error);
      setMessage('An error occurred during user creation');
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
              value={credentials.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              name="role"
              value={credentials.role}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              id="age"
              name="age"
              value={credentials.age}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Create User</button>
        </form>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default CreateUser;
