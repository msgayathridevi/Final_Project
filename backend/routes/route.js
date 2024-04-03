const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../controllers/authMiddleware');

// router.post('/users', UserController.createAdminUser);
router.post('/login', UserController.authenticateUser);
router.post('/createemployee', authMiddleware, UserController.createEmployee);
router.post('/updatepassword', authMiddleware, UserController.updatePassword);

router.post('/editSkill/:userId', authMiddleware, UserController.editSkill);
router.post('/editCertification/:userId', authMiddleware, UserController.editCertification);
router.post('/editProject/:userId', authMiddleware, UserController.editProject);

router.post('/createapprover', authMiddleware, UserController.createApprover);
router.get('/approvers', authMiddleware, UserController.allApprovers);
router.get('/approvals', authMiddleware, UserController.allApprovals);

// router.get('/approvalstatus', UserController.ApprovalStatus);
// router.get('/isUserApprover/:userId', UserController.isUserApprover);

router.get('/fetchuserapprovals/:userId', authMiddleware, UserController.fetchuserapprovals);
router.post('/fetchApprovalSkills', authMiddleware, UserController.fetchApprovalSkills);
router.post('/updateApprovalStatus', authMiddleware, UserController.updateApprovalStatus);

module.exports = router;