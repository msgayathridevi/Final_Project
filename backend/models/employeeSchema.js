const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'user'] },
  age: Number,
  phoneNumber: String, 
  designation: { type: String, enum: ['Software Engineer', 'Sr. Software Engineer', 'Solution Enabler', 'Consultant'] },
  department: { type: String, enum: ['Developer', 'Quality Analyst', 'HR', 'Financial Team', 'Management'] },
  isApprover: { type: Boolean, default: false } 
});

const EmployeeModel = mongoose.model('Employee', employeeSchema);
module.exports = EmployeeModel;
