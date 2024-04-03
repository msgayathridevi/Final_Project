const mongoose = require('mongoose');

const approverSchema = new mongoose.Schema({
  approver: String,
  approval: String,
  skills: { type: String, enum: ['ADF', 'Alteryx', 'Angular', 'AWS', 'AWS Lambda', 'PHP', 'Power BI', 'Presenting', 'Project Mgmt', 'Python', 'React', 'React Native', 'Slides', 'Snowflake'] },
  status: { type: String, enum: ['approved', 'deny', 'pending'], default: 'pending' }
});

const ApproverModel = mongoose.model('Approver', approverSchema);
module.exports = ApproverModel;
