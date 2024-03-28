// userController.js

const ExampleModel = require('../models/user'); // Import your Mongoose model

// Route to add a new user
const addUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { name, email, password, role, age } = req.body;

    // Create a new instance of ExampleModel
    const newUser = new ExampleModel({
      name,
      email,
      password,
      role,
      age
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Failed to add user', error: error.message });
  }
};



module.exports = {
  addUser
};
