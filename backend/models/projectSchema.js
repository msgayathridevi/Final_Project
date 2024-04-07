const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userId: String,
  projectName: String,
  years: Number,
  startDate: Date,
  endDate: Date,
  projectDescription: String,
  skillsGained: { type: String, enum: ['ADF', 'Alteryx', 'Angular', 'AWS', 'AWS Lambda', 'PHP', 'Power BI', 'Presenting', 'Project Mgmt', 'Python', 'React', 'React Native', 'Slides', 'Snowflake'] },
  mentor: String,
  client: String
});

const ProjectModel = mongoose.model('Project', projectSchema);
module.exports = ProjectModel;
