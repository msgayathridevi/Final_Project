const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// const User = require('../models/employeeSchema');
// const crypto = require('crypto');

// router.post('/users', UserController.createAdminUser);
router.post('/createemployee', UserController.createEmployee);
router.post('/login', UserController.authenticateUser);
router.post('/updatepassword', UserController.updatePassword);

router.post('/editSkill', UserController.editSkill);
router.post('/editCertification', UserController.editCertification);
router.post('/editProject', UserController.editProject);

router.post('/createapprover', UserController.createApprover);
router.get('/approvers', UserController.allApprovers);
router.get('/approvals', UserController.allApprovals);

module.exports = router;