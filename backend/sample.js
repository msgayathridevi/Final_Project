const EmployeeModel = require('./models/employeeSchema'); // Import your Mongoose model

// MongoDB query to find employees in the Developer department
EmployeeModel.find({ department: 'Developer' })
  .then(employees => {
    console.log('Employees in the Developer department:', employees);
  })
  .catch(err => {
    console.error('Error fetching data:', err);
  });
