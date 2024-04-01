const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI + process.env.MONGO_DB_AUTHO;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    seed();
  })
  .catch(err => console.error('MongoDB Connection Error:', err));

// Define data to be seeded
const projectData = [
  {
    email: 'd@d.com',
    projectID: '98765',
    projectName: 'Example Project',
    years: 2,
    startDate: new Date('2022-01-01'),
    endDate: new Date('2024-01-01'),
    projectDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    skillsGained: 'Full Stack',
    mentor: 'John Doe',
    client: 'Example Client'
  },
  // You can add more seed data here if needed
];

async function seed() {
  try {
    await ProjectModel.insertMany(projectData);
    console.log('Data seeding complete');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect(); 
  }
}
