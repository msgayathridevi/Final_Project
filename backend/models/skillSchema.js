const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  email: String,
//   skillID: String,
  skillMode: { type: String, enum: ['youtube', 'personalProjects', 'previouslyGained', 'collaborativeLearning'] },
  skills: { type: String, enum: ['python', 'Advanced python', 'cloud', 'dbt', 'Full Stack', 'powerBI', 'tableau', 'Redux', 'JWT'] },
  rateYourself: { type: Number, min: 1, max: 5 },
  driveLink: String
});

const SkillModel = mongoose.model('Skill', skillSchema);
module.exports = SkillModel;
