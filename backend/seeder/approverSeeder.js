const mongoose = require('mongoose');
const ApproverModel = require('../models/approverSchema');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI + process.env.MONGO_DB_AUTHO;
// console.log(mongoURI);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    seed();
  })
  .catch(err => console.error('MongoDB Connection Error:', err));

const approverData = [
  {
    approver: 'John Doe',
    approval: 'Approval 1',
    skills: 'Python'
  },
  {
    approver: 'Jane Smith',
    approval: 'Approval 2',
    skills: 'dbt'
  },
  // Add more data as needed
];

// Seed data into the database
async function seed() {
  try {
    // Insert seed data into the database
    await ApproverModel.insertMany(approverData);
    console.log('Data seeding complete');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect(); // Disconnect from the database after seeding
  }
}
