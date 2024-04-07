const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use the appropriate email service provider
    auth: {
        user: 'msg3dv@gmail.com', 
        pass: 'dvkk ghly lwje ueyb' 
    }
});

exports.sendMailToUpdatePassword = async (req, res) => {
    const requestingEmail = req.query.requestingEmail;
    // console.log("inside email controller")

    const link = `Update Password here: http://localhost:3000/Userchangepassword?emailID=${requestingEmail}`;
        
    try {
        const mailOptions = {
            from: 'msg3dv@gmail.com', 
            to: requestingEmail, 
            subject: 'Update Password', 
            text: link,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).send('Email Sent!');
    } catch (err) {
        return res.status(500).send('Internal Error');
    }
};

exports.sendMailToUpdatePassword = async (req, res) => {
    const requestingEmail = req.query.requestingEmail;
    console.log("inside email controller")

    try {
            const mailOptions = {
            from: 'msg3dv@gmail.com', 
            to: requestingEmail, 
            subject: 'Assigned as Approver', 
            text: "You are assigned as a new Approver",
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).send('Email Sent!');
    } catch (err) {
        return res.status(500).send('Internal Error');
    }
};

