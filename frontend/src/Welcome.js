import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function Welcome() {
  localStorage.clear();

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
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const resp = await response.json();
      localStorage.setItem("token", resp.token)

      if (resp.success && resp.data.role === 'admin') {
        setMessage('Login successful!');
        navigate("/home");
      } else {
        setMessage(resp.message);
        navigate(`/userhomepage/${resp.data._id}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred during login');
    }
  };

  const onChangePasswordClicked = () => {
    // Prompt user for email input
    const userEmail = window.prompt('Enter your email:');
  
    // Check if userEmail is not null (i.e., user clicked OK)
    if (userEmail !== null) {
      axios.get('http://localhost:5000/sendmailtoUpdatePassword', { params: { requestingEmail: userEmail } })
        .then(res => {
          if (res.status === 200) {
            alert('Mail Sent!');
          } else {
            console.log(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
    }
  };
  

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1 className="text-center">Welcome</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={credentials.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={credentials.password} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit" block>
              Login
            </Button>
          </Form>

          <Button variant="secondary" onClick={(e) => {
            e.preventDefault();
            onChangePasswordClicked();
          }} block>
            Change Password
          </Button>
          
          {message && <Alert variant="danger">{message}</Alert>}
          
        </Col>
      </Row>
    </Container>
  );
}

export default Welcome;
