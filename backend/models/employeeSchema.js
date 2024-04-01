const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  role: { type: String, enum: ['admin', 'user'] },
  designation: { type: String, enum: ['Software Engineer', 'Sr. Software Engineer', 'Solution Enabler', 'Consultant'] },
  skills: { type: String, enum: ['python', 'Advanced python', 'cloud', 'dbt', 'Full Stack', 'powerBI', 'tableau', 'Redux', 'JWT'] },
  certifications: String,
  project_experience: Number,
  project_description : String
});

const EmployeeModel = mongoose.model('Employee', employeeSchema);
module.exports = EmployeeModel;
