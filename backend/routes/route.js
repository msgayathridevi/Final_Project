const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../controllers/authMiddleware');

router.post('/login', UserController.authenticateUser);
router.post('/createemployee', authMiddleware, UserController.createEmployee);

router.post('/updatepassword', UserController.updatePassword);

router.post('/addSkill/:userId', UserController.addSkill);
router.post('/editSkill/:userId', UserController.editSkill);
router.post('/deleteSkill/:userId', UserController.deleteSkill);

router.post('/addProject/:userId', UserController.addProject);
router.post('/editProject/:userId', UserController.editProject);
router.post('/deleteProject/:userId', UserController.deleteProject);

router.post('/addCertification/:userId', UserController.addCertification);
router.post('/editCertification/:userId', UserController.editCertification);
router.post('/deleteCertification/:userId', UserController.deleteCertification);

router.post('/createapprover', authMiddleware, UserController.createApprover);
router.get('/approvers', UserController.allApprovers);
router.get('/approvals', UserController.allApprovals);

router.get('/fetchuserapprovals/:userId', UserController.fetchuserapprovals);
router.post('/fetchApprovalSkills', authMiddleware, UserController.fetchApprovalSkills);
router.post('/updateApprovalStatus', authMiddleware, UserController.updateApprovalStatus);

router.get('/adminDashboard', UserController.adminDashboard);
router.get('/fetchCertificationDetailAdminDashboard/:approvalName', UserController.fetchCertificationDetailAdminDashboard);
router.get('/fetchProjectDetailAdminDashboard/:approvalName', UserController.fetchProjectDetailAdminDashboard);
router.get('/fetchSkillDetailAdminDashboard/:approvalName', UserController.fetchSkillDetailAdminDashboard);

module.exports = router;