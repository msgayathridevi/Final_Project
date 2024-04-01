const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

const User = require('../models/employeeSchema');
const crypto = require('crypto');

router.post('/users', UserController.createAdminUser);
router.post('/login', UserController.authenticateUser);
router.post('/createemployee', UserController.createEmployee);
router.post('/editSkill', UserController.editSkill);
router.post('/editCertification', UserController.editCertification);
router.post('/editProject', UserController.editProject);

router.post('/updatepassword', async (req, res) => {
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
})

module.exports = router;
