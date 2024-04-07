const crypto = require('crypto');
const jwt = require("jsonwebtoken");

const EmployeeModel = require('../models/employeeSchema');

const SkillModel = require('../models/skillSchema');
const CertificationModel = require('../models/CertificationSchema');
const ProjectModel = require('../models/ProjectSchema');

const ApproverModel = require('../models/approverSchema');


exports.updatePassword = async (req, res) => {
  try {
    const emailID = req.query.emailID;
    const { password } = req.body;

    // console.log("*********************")
    // console.log(emailID);
    // console.log(password);

    const hash = crypto.createHash('sha256');
    hash.update(password);
    const password_hash = hash.digest('hex');

    const user = await EmployeeModel.findOne({ email: emailID });
    if (!user)
      return res.status(202).send('User not found');
    // console.log(user);

    user.password = password_hash;
    await user.save();

    return res.status(200).send('Password Successfuly Updated');
  } catch (err) {
    return res.status(500).send('Internal Error');
  }
};



exports.createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      age,
      phoneNumber,
      designation,
      department
    } = req.body;

    const hash = crypto.createHash('sha256');
    hash.update(password);
    const password_hash = hash.digest('hex');
    // console.log(password_hash);

    const user = new EmployeeModel({ name, email: email.toLowerCase(), password: password_hash, role, age, phoneNumber, designation, department });
    // console.log(user)
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password)

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email' });
    }

    // Hash the provided password using SHA-256
    const hashedPassword = hashPassword(password);

    // Compare hashed passwords
    if (hashedPassword !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
      // console.log(token)
      return res.status(201).json({ success: true, data: user, token: token, message: 'Login successful!' });
    });

  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
};

function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

exports.editSkill = async (req, res) => {
  try {
    const { skillMode, skills, rateYourself, driveLink } = req.body;
    const userId = req.params.userId;

    let existingSkill = await SkillModel.findOne({ userId });

    if (existingSkill) {
      existingSkill.skillMode = skillMode;
      existingSkill.skills = skills;
      existingSkill.rateYourself = rateYourself;
      existingSkill.driveLink = driveLink;

      await existingSkill.save();

      return res.status(200).json({ message: 'Skill updated successfully' });
    } else {
      return res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addSkill = async (req, res) => {
  try {
    const { skillMode, skills, rateYourself, driveLink } = req.body;
    const userId = req.params.userId;

    const newSkill = new SkillModel({
      userId,
      skillMode,
      skills,
      rateYourself,
      driveLink
    });

    await newSkill.save();

    return res.status(200).json({ message: 'Skill added successfully' });
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { skillMode, skills, rateYourself, driveLink } = req.body;
    const userId = req.params.userId;

    // Check if the skill exists
    const deletedSkill = await SkillModel.findOneAndDelete({
      userId, skillMode, skills, rateYourself, driveLink
    });

    // If skill does not exist, return an error response
    if (!deletedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    return res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.editCertification = async (req, res) => {
  try {
    const { email, credentialsID, driveLink, organization, expireDate, issueDate, durationInWeeks, skills } = req.body;
    const userId = req.params.userId;

    // Check if the certification exists
    let existingCertification = await CertificationModel.findOne({ userId });

    if (!existingCertification) {
      // If certification does not exist, create a new one
      existingCertification = new CertificationModel({
        email,
        userId,
        credentialsID,
        driveLink,
        organization,
        expireDate,
        issueDate,
        durationInWeeks,
        skills
      });
    } else {
      // If certification exists, update it with the new data
      existingCertification.credentialsID = credentialsID;
      existingCertification.driveLink = driveLink;
      existingCertification.organization = organization;
      existingCertification.expireDate = expireDate;
      existingCertification.issueDate = issueDate;
      existingCertification.durationInWeeks = durationInWeeks;
      existingCertification.skills = skills;
    }

    // Save the certification to the database
    await existingCertification.save();

    return res.status(200).json({ message: 'Certification updated successfully' });
  } catch (error) {
    console.error('Error updating certification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addProject = async (req, res) => {
  try {
    const { projectName, years, startDate, endDate, projectDescription, skillsGained, mentor, client } = req.body;
    const userId = req.params.userId;

    const newProject = new ProjectModel({
      userId,
      projectName,
      years,
      startDate,
      endDate,
      projectDescription,
      skillsGained,
      mentor,
      client
    });

    await newProject.save();

    return res.status(200).json({ message: 'Project added successfully' });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.editProject = async (req, res) => {
  try {
    const { projectName, years, startDate, endDate, projectDescription, skillsGained, mentor, client } = req.body;
    const userId = req.params.userId;

    let existingProject = await ProjectModel.findOne({ userId });

    if (existingProject) {
      // If project exists, update it with the new data
      existingProject.projectName = projectName;
      existingProject.years = years;
      existingProject.startDate = startDate;
      existingProject.endDate = endDate;
      existingProject.projectDescription = projectDescription;
      existingProject.skillsGained = skillsGained;
      existingProject.mentor = mentor;
      existingProject.client = client;


      // Save the project to the database
      await existingProject.save();

      return res.status(200).json({ message: 'Project updated successfully' });
    } else {
      return res.status(404).json({ message: 'Skill not found' });
    }

  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { projectName, years, startDate, endDate, projectDescription, skillsGained, mentor, client } = req.body;
    const userId = req.params.userId;

    // Check if the project exists
    const deletedProject = await ProjectModel.findOneAndDelete({ userId,projectName, years, startDate, endDate, projectDescription, skillsGained, mentor, client });

    // If project does not exist, return an error response
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// exports.editProject = async (req, res) => {
//   try {
//     const { email, projectName, years, startDate, endDate, projectDescription, skillsGained, mentor, client } = req.body;
//     const userId = req.params.userId;

//     let existingProject = await ProjectModel.findOne({ userId });

//     if (!existingProject) {
//       // If project does not exist, create a new one
//       existingProject = new ProjectModel({
//         userId,
//         projectName,
//         years,
//         startDate,
//         endDate,
//         projectDescription,
//         skillsGained,
//         mentor,
//         client
//       });
//     } else {
//       // If project exists, update it with the new data
//       existingProject.projectName = projectName;
//       existingProject.years = years;
//       existingProject.startDate = startDate;
//       existingProject.endDate = endDate;
//       existingProject.projectDescription = projectDescription;
//       existingProject.skillsGained = skillsGained;
//       existingProject.mentor = mentor;
//       existingProject.client = client;
//     }

//     // Save the project to the database
//     await existingProject.save();

//     return res.status(200).json({ message: 'Project updated successfully' });
//   } catch (error) {
//     console.error('Error updating project:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


const designationHierarchy = {
  'Software Engineer': [],
  'Sr. Software Engineer': ['Software Engineer'],
  'Technology Solution Enabler': ['Sr. Software Engineer', 'Software Engineer'],
  'Technology Solution Consultant': ['Technology Solution Enabler', 'Sr. Software Engineer', 'Software Engineer'],
  'Technology Solution Architect': ['Technology Solution Consultant', 'Technology Solution Enabler', 'Sr. Software Engineer', 'Software Engineer'],
  'Project Manager': ['Technology Solution Architect', 'Technology Solution Consultant', 'Technology Solution Enabler', 'Sr. Software Engineer', 'Software Engineer'],
  'Functional Head': ['Project Manager', 'Technology Solution Architect', 'Technology Solution Consultant', 'Technology Solution Enabler', 'Sr. Software Engineer', 'Software Engineer'],
  'Delivery Head': ['Functional Head', 'Project Manager', 'Technology Solution Architect', 'Technology Solution Consultant', 'Technology Solution Enabler', 'Sr. Software Engineer', 'Software Engineer'],
};

function canApprove(approverDesignation, requesterDesignation) {
  const approverTags = designationHierarchy[approverDesignation];
  console.log("approverTags" + approverTags)
  const requesterTags = designationHierarchy[requesterDesignation];

  console.log("***********" + approverTags.some(tag => requesterTags.includes(tag)));
  // Check if the approver has a tag that matches or is higher in the hierarchy than the requester's tag
  return approverTags.some(tag => requesterTags.includes(tag));
}

exports.createApprover = async (req, res) => {
  try {
    const { approver, approval, skills } = req.body;

    const approverDetails = await EmployeeModel.findOne({ name: approver });
    const approvalDetails = await EmployeeModel.findOne({ name: approval });

    if (!approverDetails) {
      return res.status(404).json({ message: 'Approver not found in employee records' });
    }

    console.log("approverDetails.designation, approvalDetails.designation" + approverDetails.designation + approvalDetails.designation)
    if (!canApprove(approverDetails.designation, approvalDetails.designation)) {
      return res.status(202).json({ message: 'The designated approver does not have the authority to approve.' });
    }

    // Create a new approver document
    const newApprover = new ApproverModel({
      approver,
      approval,
      skills
    });

    // Save the new approver document to the database
    approverDetails.isApprover = true;
    await newApprover.save();
    await approverDetails.save();

    await axios.get('http://localhost:5000/sendMailApproverCreated', {
      params: { requestingEmail: approverDetails.email }
    });

    return res.status(201).json({ message: 'Approver created successfully' });
  } catch (error) {
    console.error('Error creating approver:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.allApprovers = async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.allApprovals = async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.fetchuserapprovals = async (req, res) => {
  try {
    const user = await EmployeeModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is an approver
    const name = user.name;
    const isApprover = user.isApprover || false;

    // If the user is an approver, find associated approvals
    let approvals = [];
    if (isApprover) {
      approvals = await ApproverModel.find({ approver: name });
    }

    res.status(200).json({ isApprover, approvals });
  } catch (error) {
    console.error('Error fetching user approvals:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.fetchApprovalSkills = async (req, res) => {
  try {
    const { approval } = req.body;

    // Find the user ID based on the approval name
    const employee = await EmployeeModel.findOne({ name: approval });
    // console.log(employee._id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found for the given approval' });
    }
    // Use the user ID to find the details of the skill
    const skills = await SkillModel.find({ userId: employee._id });
    // console.log(skills);
    // console.log(skills);
    if (!skills || skills.length === 0) {
      return res.status(404).json({ message: 'Skills not found for the employee' });
    }

    // Send the skill details back to the frontend
    res.status(200).json({ data: skills });
  } catch (error) {
    console.error('Error fetching approval skills:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateApprovalStatus = async (req, res) => {
  try {
    const { userId, approval, status } = req.body;

    // contains approver detials
    // here userId is approver's
    const user = await EmployeeModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is an approver
    const response = await ApproverModel.findOne({ approver: user.name, approval: approval });
    if (!response) {
      return res.status(404).json({ message: 'User is not authorized to approve/deny this request' });
    }

    // Update the status in the ApproverModel
    response.status = status;
    await response.save();

    res.status(200).json({ message: 'Approval status updated successfully' });
  } catch (error) {
    console.error('Error updating approval status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.adminDashboard = async (req, res) => {
  try {
    // Find all approvers in the database
    const approvers = await ApproverModel.find();
    // console.log(approvers);

    // Check if any approvers were found
    if (!approvers || approvers.length === 0) {
      return res.status(404).json({ message: 'No approvers found' });
    }

    // Return the list of approvers
    res.status(200).json({ approvers });
  } catch (error) {
    console.error('Error fetching approvers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.fetchCertificationDetailAdminDashboard = async (req, res) => {
  try {
    const approvalName = req.params.approvalName;

    // Find the user ID based on the approval name
    const user = await EmployeeModel.findOne({ name: approvalName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the certification details based on the user ID
    const certification = await CertificationModel.findOne({ userId: user._id });

    // Extract the driveLink from the certification
    const driveLink = certification ? certification.driveLink : null;

    res.status(200).json({ driveLink });
  } catch (error) {
    console.error('Error fetching certification details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.fetchProjectDetailAdminDashboard = async (req, res) => {
  try {
    const approvalName = req.params.approvalName;

    // Find the user ID based on the approval name
    const user = await EmployeeModel.findOne({ name: approvalName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the certification details based on the user ID
    const project = await ProjectModel.findOne({ userId: user._id });

    // Extract the driveLink from the certification
    const client = project ? project.client : null;

    res.status(200).json({ client });
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.fetchSkillDetailAdminDashboard = async (req, res) => {
  try {
    const approvalName = req.params.approvalName;

    // Find the user ID based on the approval name
    const user = await EmployeeModel.findOne({ name: approvalName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the certification details based on the user ID
    const skil = await SkillModel.findOne({ userId: user._id });

    // Extract the driveLink from the certification
    const rateYourself = skil ? skil.rateYourself : null;

    res.status(200).json({ rateYourself });
  } catch (error) {
    console.error('Error fetching skill details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
