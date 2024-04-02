const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  email: String,
  userId: String,
  projectID: String,
  projectName: String,
  years: Number,
  startDate: Date,
  endDate: Date,
  projectDescription: String,
  skillsGained: { type: String, enum: ['python', 'Advanced python', 'cloud', 'dbt', 'Full Stack', 'powerBI', 'tableau', 'Redux', 'JWT'] },
  mentor: String,
  client: String
});

const ProjectModel = mongoose.model('Project', projectSchema);
module.exports = ProjectModel;
