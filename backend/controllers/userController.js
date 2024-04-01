const bcrypt = require('bcrypt');
const crypto = require('crypto');

const User = require('../models/userSchema');
const SkillModel = require('../models/skillSchema');
const CertificationModel = require('../models/CertificationSchema');

exports.createAdminUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Admin User created successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      age
    } = req.body;

    const hash = crypto.createHash('sha256');
    hash.update(password);
    const password_hash = hash.digest('hex');
  
    const user = new User({name, email: email.toLowerCase(), password: password_hash, role, age});
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
