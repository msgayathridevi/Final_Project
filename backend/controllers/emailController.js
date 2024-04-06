const nodemailer = require('nodemailer');

exports.sendMailToUpdatePassword = async (req, res) => {
    const requestingEmail = req.query.requestingEmail;
    console.log("inside email controller")

    const link = `Update Password here: http://localhost:3000/Userchangepassword?emailID=${requestingEmail}`;

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
        return res.status(200).send('Email Sent!');
    } catch (err) {
        return res.status(500).send('Internal Error');
    }
};


exports.updatePassword = async (req, res) => {
    try {
      const emailID = req.query.emailID;
      const { password } = req.body;
        
      // console.log("*********************")
      // console.log(emailID);
      // console.log(password);
  
      const hash = crypto.createHash('sha256');
      hash.update(password);
      const password_hash = hash.digest('hex');
  
      const user = await EmployeeModel.findOne({ email: emailID });
      if (!user)
        return res.status(202).send('User not found');
      // console.log(user);
  
      user.password = password_hash;
      await user.save();
  
      return res.status(200).send('Password Successfuly Updated');
    } catch (err) {
      return res.status(500).send('Internal Error');
    }
  };
  
  