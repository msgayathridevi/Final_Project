const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.post('/users', UserController.createAdminUser);
router.post('/login', UserController.authenticateUser);
router.post('/api/createuser', UserController.createUser )

module.exports = router;
