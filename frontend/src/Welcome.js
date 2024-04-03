import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './welcome.css';

function Welcome() {
  localStorage.clear();

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State variable to track admin status

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
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const resp = await response.json();
      localStorage.setItem("token", resp.token)
      // console.log(resp.token);

      if (resp.success && resp.data.role === 'admin') {
        setIsAdmin(true); // Set isAdmin to true if the user is an admin
        setMessage('Login successful!');
        navigate("/home");
      } else {
        setIsAdmin(false); // Set isAdmin to false if the user is not an admin
        setMessage(resp.message);
        navigate(`/userhomepage/${resp.data._id}`);
        // alert(resp.data._id);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred during login');
    }
  };

  const onChangePasswordClicked = () => {
    axios.get('http://localhost:5000/sendmail', { params: { requestingEmail: credentials.email } })
      .then(res => {
        if (res.status === 200) {
          alert('Mail Sent!');
        } else {
          console.log(res.data);
        }
      }).catch(err => {
        console.log(err);
      });
  };

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

        {/* Conditionally render based on isAdmin */}
        {isAdmin ? (
          <button onClick={() => navigate("/createemployee")}>Create User</button>
        ) : (
          <h1>Only admin</h1>
        )}

      </header>
    </div>
  );
}

export default Welcome;
