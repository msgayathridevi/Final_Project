const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.post('/users', UserController.createUser);
router.get('/users/:id', UserController.getUserById);
router.post('/api/login', UserController.authenticateUser);

// Define other routes as needed

module.exports = router;
