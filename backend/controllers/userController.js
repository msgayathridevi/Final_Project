const bcrypt = require('bcrypt');
const crypto = require('crypto');

const User = require('../models/employeeSchema');

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
    console.log(password_hash);

    const user = new User({name, email: email.toLowerCase(), password: password_hash, role, age, phoneNumber, designation, department});
    console.log(user)
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email' });
    }

    // Hash the provided password using SHA-256
    const hashedPassword = hashPassword(password);

    // Compare hashed passwords
    if (hashedPassword !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // Authentication successful
    // Optionally, you can set a session or generate a token here
    return res.status(201).json({ success: true, data: user, message: 'Login successful!' });
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

      const user = await User.findOne({ email: emailID });
      if (!user)
          return res.status(202).send('User not found');
      console.log(user);

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

      // Check if the skill exists
      const existingSkill = await SkillModel.findOne({ email });
      if (!existingSkill) {
          return res.status(404).json({ message: 'Skill not found' });
      }

      // Update the skill with the new data
      existingSkill.skillMode = skillMode;
      existingSkill.skills = skills;
      existingSkill.rateYourself = rateYourself;
      existingSkill.driveLink = driveLink;

      // Save the updated skill in the database
      await existingSkill.save();
      return res.status(200).json({ message: 'Skill updated successfully' });
  } catch (error) {
      console.error('Error updating skill:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

exports.editCertification = async (req, res) => {
  try {
    const { email, driveLink, organization, expireDate, issueDate, durationInWeeks, skills } = req.body;

    // Check if the certification exists
    const existingCertification = await CertificationModel.findOne({ email });
    if (!existingCertification) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    // Update the certification with the new data
    existingCertification.driveLink = driveLink;
    existingCertification.organization = organization;
    existingCertification.expireDate = expireDate;
    existingCertification.issueDate = issueDate;
    existingCertification.durationInWeeks = durationInWeeks;
    existingCertification.skills = skills;

    // Save the updated certification in the database
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

    // Check if the project exists
    const existingProject = await ProjectModel.findOne({ email });
    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update the project with the new data
    existingProject.projectName = projectName;
    existingProject.years = years;
    existingProject.startDate = startDate;
    existingProject.endDate = endDate;
    existingProject.projectDescription = projectDescription;
    existingProject.skillsGained = skillsGained;
    existingProject.mentor = mentor;
    existingProject.client = client;

    // Save the updated project in the database
    await existingProject.save();
    return res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createApprover = async (req, res) => {
  try {
    const { approver, approval, skills, status } = req.body;

    // Create a new approver document
    const newApprover = new ApproverModel({
      approver,
      approval,
      skills
    });

    // Save the new approver document to the database
    await newApprover.save();
    return res.status(201).json({ message: 'Approver created successfully' });
  } catch (error) {
    console.error('Error creating approver:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.allApprovers = async (req, res) => {
  try {
    const employees = await User.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.allApprovals = async (req, res) => {
  try {
    const employees = await User.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};