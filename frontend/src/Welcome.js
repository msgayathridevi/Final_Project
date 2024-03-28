import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
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
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      console.log(response) 
      
      const data = await response.json();

      if (data.success) {
        setMessage('Login successful!');
        // Handle successful login (e.g., store user data, redirect to home)
        navigate("/home")
        
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred during login');
    }
  };

  const onChangePasswordClicked = () => {
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome</h1>
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit">Login</button>
        </form>

        <button onClick={(e) => {
          e.preventDefault();
          onChangePasswordClicked();
        }}>Change Password</button>
        <p>{message}</p>
        {/* <Link to="/home">
          <button>Go to Home</button>
        </Link> */}
      </header>
    </div>
  );
}

export default Welcome;
