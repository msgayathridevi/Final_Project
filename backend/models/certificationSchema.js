const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  email: String,
  userId: String,
  certificationID: String,
  driveLink: String,
  organization: String,
  expireDate: Date,
  issueDate: Date,
  durationInWeeks: Number,
  skills: { type: String, enum: ['ADF', 'Alteryx', 'Angular', 'AWS', 'AWS Lambda', 'PHP', 'Power BI', 'Presenting', 'Project Mgmt', 'Python', 'React', 'React Native', 'Slides', 'Snowflake'] },
  
});

const CertificationModel = mongoose.model('Certification', certificationSchema);
module.exports = CertificationModel;
