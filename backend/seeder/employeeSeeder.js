const mongoose = require('mongoose');
const EmployeeModel = require('../models/employeeSchema');
require('dotenv').config();

// MongoDB Atlas connection URI// MongoDB Atlas connection URI
// const mongoURI = `${process.env.MONGODB_URI}${process.env.MONGO_DB_AUTHO}`;
const mongoURI = process.env.MONGODB_URI + process.env.MONGO_DB_AUTHO;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    // Once connected, call the seed function
    seedEmployees();
  })
  .catch(err => console.error('MongoDB Connection Error:', err));

// Function to seed employees
async function seedEmployees() {
  try {
    // Check if there are already documents in the collection
    const count = await EmployeeModel.countDocuments();
    if (count > 0) {
      console.log('Employees already seeded');
      return;
    }

    // Seed employees
    await EmployeeModel.insertMany([
      {
        name: 'John Doe',
        role: 'user',
        designation: 'Software Engineer',
        skills: 'cloud',
        certifications: 'AWS Certified Developer',
        project_experience: 3,
        project_description: 'Developed a web application using React and Node.js',
      },
      // Add more employee objects as needed
    ]);

    console.log('Employees seeded successfully');
  } catch (error) {
    console.error('Error seeding employees:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}
