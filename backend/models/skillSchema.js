const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  email: String,
  userId: String,
//   skillID: String,
  skillMode: { type: String, enum: ['youtube', 'personalProjects', 'previouslyGained', 'collaborativeLearning'] },
  skills: { type: String, enum: ['ADF', 'Alteryx', 'Angular', 'AWS', 'AWS Lambda', 'PHP', 'Power BI', 'Presenting', 'Project Mgmt', 'Python', 'React', 'React Native', 'Slides', 'Snowflake'] },
  rateYourself: { type: Number, min: 1, max: 5 },
  driveLink: String
});

const SkillModel = mongoose.model('Skill', skillSchema);
module.exports = SkillModel;
