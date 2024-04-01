const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeID: String,
  name: String,
  role: { type: String, enum: ['admin', 'user'] },
  designation: { type: String, enum: ['Software Engineer', 'Sr. Software Engineer', 'Solution Enabler', 'Consultant'] },
  department: { type: String, enum: ['Developer', 'Quality Analyst', 'HR', 'Financial Team', 'Management'] }
});

const EmployeeModel = mongoose.model('Employee', employeeSchema);
module.exports = EmployeeModel;
