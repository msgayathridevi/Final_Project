const express = require('express');
const router = express.Router();

const authMiddleware = require('../controllers/authMiddleware');
const EmailController = require('../controllers/emailController'); 

router.get('/sendmailtoUpdatePassword', EmailController.sendMailToUpdatePassword); 
router.get('/sendMailApproverCreated', EmailController.sendMailToUpdatePassword); 
// router.post('/updatepassword', EmailController.updatePassword);

module.exports = router;
