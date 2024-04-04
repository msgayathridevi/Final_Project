const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

// http://localhost:5000/sendmail?requestingEmail=gaya@gmail.com
router.get('/sendmailtoUpdatePassword', async (req, res) => {
    const requestingEmail = req.query.requestingEmail;
    // console.log(requestingEmail);

    const link = `Update Password here: http://localhost:3000/Userchangepassword?emailID=${requestingEmail}`

    try {
        // Create a transporter using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Use the appropriate email service provider
            auth: {
                user: 'msg3dv@gmail.com', 
                pass: 'dvkk ghly lwje ueyb' 
            }
        });

        const mailOptions = {
            from: 'msg3dv@gmail.com', 
            to: requestingEmail, 
            subject: 'Update Password', 
            text: link,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).send('Email Sent!')
    }
    catch (err) {
        return res.status(500).send('Internal Error');
    }
})

module.exports = router;
