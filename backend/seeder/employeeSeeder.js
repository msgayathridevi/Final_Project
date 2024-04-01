// Import necessary modules
const mongoose = require('mongoose');
const EmployeeModel = require('../models/employeeSchema'); // Import your Mongoose model

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

// Define data to be seeded
const employeeData = [
  {
    employeeID: '123456',
    name: 'John Doe',
    role: 'user',
    designation: 'Software Engineer',
    department: 'Developer'
  },
  // You can add more seed data here if needed
];

// Seed data into the database
async function seed() {
  try {
    // Insert seed data into the database
    await EmployeeModel.insertMany(employeeData);
    console.log('Data seeding complete');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect(); // Disconnect from the database after seeding
  }
}
