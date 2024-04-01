const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  certificationID: String,
  driveLink: String,
  organization: String,
  expireDate: Date,
  issueDate: Date,
  durationInWeeks: Number,
  skills: { type: String, enum: ['python', 'Advanced python', 'cloud', 'dbt', 'Full Stack', 'powerBI', 'tableau', 'Redux', 'JWT'] },
});

const CertificationModel = mongoose.model('Certification', certificationSchema);
module.exports = CertificationModel;
