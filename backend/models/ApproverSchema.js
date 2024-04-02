const mongoose = require('mongoose');

const approverSchema = new mongoose.Schema({
  approver: String,
  approval: String,
  skills: { type: String, enum: ['python', 'Advanced python', 'cloud', 'dbt', 'Full Stack', 'powerBI', 'tableau', 'Redux', 'JWT'] },
  status: { type: String, enum: ['approved', 'deny', 'pending']}
});

const ApproverModel = mongoose.model('Approver', approverSchema);
module.exports = ApproverModel;
