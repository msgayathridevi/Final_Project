const mongoose = require('mongoose');

const approverSchema = new mongoose.Schema({
  approver: String,
  approval: String,
  status: { type: String, enum: ['approved', 'deny', 'pending']}
});

const ApproverModel = mongoose.model('Approver', approverSchema);
module.exports = ApproverModel;
