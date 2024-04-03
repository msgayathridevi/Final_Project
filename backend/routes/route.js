const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// router.post('/users', UserController.createAdminUser);
router.post('/login', UserController.authenticateUser);
router.post('/createemployee', UserController.createEmployee);
router.post('/updatepassword', UserController.updatePassword);

router.post('/editSkill/:userId', UserController.editSkill);
router.post('/editCertification', UserController.editCertification);
router.post('/editProject', UserController.editProject);

router.post('/createapprover', UserController.createApprover);
router.get('/approvers', UserController.allApprovers);
router.get('/approvals', UserController.allApprovals);

// router.get('/approvalstatus', UserController.ApprovalStatus);
// router.get('/isUserApprover/:userId', UserController.isUserApprover);

router.get('/fetchuserapprovals/:userId', UserController.fetchuserapprovals);
router.post('/fetchApprovalSkills', UserController.fetchApprovalSkills);
router.post('/updateApprovalStatus', UserController.updateApprovalStatus);

module.exports = router;