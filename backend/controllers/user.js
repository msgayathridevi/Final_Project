const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto')

exports.createAdminUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Admin User created successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(user)
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.loginUser = async (req,res) => {
  try {
    const user = User.findOne (req.body);

  } catch (error) {
    
  }
}

exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Hash the provided password using SHA-256
    const hashedPassword = hashPassword(password);

    // Compare hashed passwords
    if (hashedPassword !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Authentication successful
    // Optionally, you can set a session or generate a token here
    return res.status(200).json({ success: true, message: 'Login successful!', redirectTo: '/home' });
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
};

// Hash a password using SHA-256
function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}