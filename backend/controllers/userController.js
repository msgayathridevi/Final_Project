const bcrypt = require('bcrypt');
const crypto = require('crypto');

const jwt = require("jsonwebtoken");

const EmployeeModel = require('../models/employeeSchema');

const SkillModel = require('../models/skillSchema');
const CertificationModel = require('../models/CertificationSchema');
const ProjectModel = require('../models/ProjectSchema');

const ApproverModel = require('../models/approverSchema');

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

exports.updatePassword = async (req, res) => {
  try {
    const emailID = req.query.emailID;
    const { password } = req.body;


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

exports.editSkill = async (req, res) => {
  try {
    const { email, skillMode, skills, rateYourself, driveLink } = req.body;
    const userId = req.params.userId;
    // console.log("userID in cbackend : "+ userId);

    // Check if the skill exists
    let existingSkill = await SkillModel.findOne({ userId });

    if (!existingSkill) {
      // If skill does not exist, create a new one
      existingSkill = new SkillModel({
        email,
        userId,
        skillMode,
        skills,
        rateYourself,
        driveLink
      });
    } else {
      // If skill exists, update it with the new data
      existingSkill.skillMode = skillMode;
      existingSkill.skills = skills;
      existingSkill.rateYourself = rateYourself;
      existingSkill.driveLink = driveLink;
    }

    // Save the skill to the database
    await existingSkill.save();

    return res.status(200).json({ message: 'Skill updated successfully' });
  } catch (error) {
    console.error('Error updating skill:', error);
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

exports.editProject = async (req, res) => {
  try {
    const { email, projectName, years, startDate, endDate, projectDescription, skillsGained, mentor, client } = req.body;
    const userId = req.params.userId;

    let existingProject = await ProjectModel.findOne({ userId });

    if (!existingProject) {
      // If project does not exist, create a new one
      existingProject = new ProjectModel({
        email,
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
    } else {
      // If project exists, update it with the new data
      existingProject.projectName = projectName;
      existingProject.years = years;
      existingProject.startDate = startDate;
      existingProject.endDate = endDate;
      existingProject.projectDescription = projectDescription;
      existingProject.skillsGained = skillsGained;
      existingProject.mentor = mentor;
      existingProject.client = client;
    }

    // Save the project to the database
    await existingProject.save();

    return res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createApprover = async (req, res) => {
  try {
    const { approver, approval, skills } = req.body;
    // console.log(approver);    

    const existingEmployee = await EmployeeModel.findOne({ name: approver });
    // console.log("Existing employee: ", existingEmployee);

    if (!existingEmployee) {
      // console.log("Approver not found in employee records");
      return res.status(404).json({ message: 'Approver not found in employee records' });
    }

    // Create a new approver document
    const newApprover = new ApproverModel({
      approver,
      approval,
      skills
    });

    // Save the new approver document to the database
    existingEmployee.isApprover = "true";

    // console.log("Existing employee: ", existingEmployee);
    await newApprover.save();
    await existingEmployee.save();
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
