// Import necessary modules
const mongoose = require('mongoose');
const crypto = require('crypto'); // Import the crypto module for hashing
const ExampleModel = require('../models/user'); // Import your Mongoose model

// Load environment variables from .env file
require('dotenv').config();

// MongoDB Atlas connection URI
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    // Once connected, call the seed function
    seed();
  })
  .catch(err => console.error('MongoDB Connection Error:', err));

// Define data to be seeded
const userData = [
  { name: 'Gayathri_hashed', email: 'abcd@bcd.com', password: 'pwd1234', role: 'admin', id: 'id123', age: 22 },
  // You can add more seed data here if needed
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
    await ExampleModel.insertMany(seededData);
    console.log('Data seeding complete');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect(); // Disconnect from the database after seeding
  }
}
