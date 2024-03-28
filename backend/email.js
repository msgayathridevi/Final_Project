const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

// http://localhost:5000/sendmail?requestingEmail=gaya@gmail.com
router.get('/sendmail', async (req, res) => {
    const requestingEmail = req.query.requestingEmail;

    // Create a transporter using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use the appropriate email service provider
        auth: {
            user: 'msg3dv@gmail.com', // Your email address
            pass: 'dvkk ghly lwje ueyb' // Your password or application-specific password
        }
    });

    // Define email options
    const mailOptions = {
        from: 'msg3dv@gmail.com', // Sender address
        to: requestingEmail, // List of recipients
        subject: 'Test Email', // Subject line
        text: 'This is a test email sent using Node.js and nodemailer.', // Plain text body
    };

    // Send email
    await transporter.sendMail(mailOptions);
})

module.exports = router;
