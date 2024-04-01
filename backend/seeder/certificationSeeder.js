// Import necessary modules
const mongoose = require('mongoose');
const crypto = require('crypto'); // Import the crypto module for hashing
const CertificationModel = require('../models/certificationSchema'); // Import your Mongoose model

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
const certificationData = [
  {
    email: 'd@d.com',
    certificationID: '12345',
    driveLink: 'https://example.com/certification',
    organization: 'Example Organization',
    expireDate: new Date('2025-12-31'),
    issueDate: new Date('2020-01-01'),
    durationInWeeks: 12,
    skills: 'cloud'
  },
  // You can add more seed data here if needed
];

// Seed data into the database
async function seed() {
  try {
    // Insert seed data into the database
    await CertificationModel.insertMany(certificationData);
    console.log('Data seeding complete');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect(); // Disconnect from the database after seeding
  }
}
