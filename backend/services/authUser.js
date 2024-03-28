const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Assuming you have a User model

const router = express.Router();

// Function to authenticate user based on credentials
async function authenticateUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare hashed passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Authentication successful
    // Optionally, you can set a session or generate a token here
    return res.status(200).json({ success: true, message: 'Login successful!', redirectTo: '/home' });
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
}

// Define the authentication endpoint
router.post('/api/login', authenticateUser);

module.exports = router;
