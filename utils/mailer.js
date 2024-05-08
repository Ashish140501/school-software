const nodemailer = require('nodemailer');

const sendResetPasswordEmail = async (email, resetToken) => {
    try {
        // Validate email and resetToken
        if (!email || !resetToken) {
            throw new Error('Email and resetToken are required');
        }

        // Create a Nodemailer transporter using SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'providenci.goldner96@ethereal.email',
                pass: 'PBwCxsn21WDDRZ9w7v'
            }
        });

        // Validate transporter
        if (!transporter) {
            throw new Error('Failed to create transporter');
        }

        const link = `http://localhost:${process.env.APP_PORT}/api/admin/school/reset-password?token=${resetToken}`

        // Email content
        let mailOptions = {
            from: 'providenci.goldner96@ethereal.email', // Sender email
            to: email, // Recipient email
            subject: 'Reset Password', // Subject line
            text: `Click on the following link to reset your password:\n ${link}` // Plain text body
        };

        // Validate mailOptions
        if (!mailOptions.from || !mailOptions.to || !mailOptions.subject || !mailOptions.text) {
            throw new Error('Invalid mailOptions');
        }

        // Send email
        try {
            await transporter.sendMail(mailOptions);
        } catch (smtpError) {
            console.error('SMTP error:', smtpError.message);
            throw new Error('SMTP error occurred');
        }

        console.log('Reset password email sent');
        return link
    } catch (error) {
        console.error('Error sending reset password email:', error.message);
        throw new Error('Error sending reset password email');
    }
};



module.exports = sendResetPasswordEmail;
