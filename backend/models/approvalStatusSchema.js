const mongoose = require('mongoose');

const approvalStatusSchema = new mongoose.Schema({
  approver: String,
  approval: String,
  skills: { type: String, enum: ['ADF', 'Alteryx', 'Angular', 'AWS', 'AWS Lambda', 'PHP', 'Power BI', 'Presenting', 'Project Mgmt', 'Python', 'React', 'React Native', 'Slides', 'Snowflake'] },
  status: { type: String, enum: ['approved', 'deny', 'pending'], default: 'pending' }
});

const ApprovalStatusModel = mongoose.model('ApprovalStatus', approvalStatusSchema);
module.exports = ApprovalStatusModel;
