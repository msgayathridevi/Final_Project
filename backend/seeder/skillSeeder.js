// Import necessary modules
const mongoose = require('mongoose');
const SkillModel = require('../models/skillSchema'); // Import your Mongoose model

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
const skillData = [
  {
    skillID: '123',
    skillMode: 'youtube',
    skills: 'python',
    rateYourself: 4,
    driveLink: 'https://example.com/python-tutorial'
  },
  // You can add more seed data here if needed
];

// Seed data into the database
async function seed() {
  try {
    // Insert seed data into the database
    await SkillModel.insertMany(skillData);
    console.log('Data seeding complete');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect(); // Disconnect from the database after seeding
  }
}
