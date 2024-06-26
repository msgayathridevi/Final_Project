// Import necessary modules
const mongoose = require('mongoose');
const crypto = require('crypto'); // Import the crypto module for hashing
const userModel = require('../models/employeeSchema'); // Import your Mongoose model

// Load environment variables from .env file
require('dotenv').config();

// MongoDB Atlas connection URI
const mongoURI = process.env.MONGODB_URI + process.env.MONGO_DB_AUTHO;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    // Once connected, call the seed function
    seed();
  })
  .catch(err => console.error('MongoDB Connection Error:', err));

  const userData = [
    {
      name: 'Gayathri',
      email: 'gayathri@gmail.com',
      password: 'gayathri',
      role: 'admin',
      age: 22,
      phoneNumber: '9978451242',
      designation: 'Delivery Head', // Ensure there are no leading/trailing spaces
      department: 'Finance'
    },
    // Add more seed data here if needed
  ];
  
// Hash a password using SHA-256
function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

// Seed data into the database
async function seed() {
  try {
    // Hash passwords before seeding
    const seededData = userData.map(user => ({
      ...user,
      password: hashPassword(user.password)
    }));

    // Insert seed data into the database
    await userModel.insertMany(seededData);
    console.log('Data seeding complete');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect(); // Disconnect from the database after seeding
  }
}