const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'user'] },
  age: Number,
  phoneNumber: String,
  designation: { type: String, enum: ['Software Engineer', 'Sr. Software Engineer', 'Technology Solution Enabler', 'Technology Solution Consultant', 'Technology Solution Architect', 'Project Manager', 'Functional Head', 'Delivery Head'] },
  department: { type: String, enum: ['Delivery', 'Finance', 'Support', 'Quality', 'Technology', 'HR', 'IT', 'Talent Acquisition', 'Talent Management'] },
  isApprover: { type: Boolean, default: false }
});

const EmployeeModel = mongoose.model('Employee', employeeSchema);
module.exports = EmployeeModel;
