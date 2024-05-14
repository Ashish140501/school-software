const nodemailer = require('nodemailer');

const sendResetPasswordEmail = async (name, email, resetToken, isNew) => {
    try {
        // Validate email and resetToken
        if (!email || !resetToken) {
            throw new Error('Email and resetToken are required');
        }

        const BASE_URL = process.env.BASE_URL || `http://localhost:3000/reset-password`

        // Create a Nodemailer transporter using SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: '3eteamdev@gmail.com',
                pass: 'uvojutcstbjbvofd'
            }
        });

        // Validate transporter
        if (!transporter) {
            throw new Error('Failed to create transporter');
        }

        const link = `${BASE_URL}?email=${email}&token=${resetToken}`

        // Email content
        let mailOptions = {
            from: '"Edumin Support" <3eteamdev@gmail.com>', // Sender email
            to: email, // Recipient email
            subject: 'Reset Password', // Subject line
            html: isNew ? getHTMLOnBoard(link, name) : getHTMLReset(link, name)
        };

        // Validate mailOptions
        if (!mailOptions.from || !mailOptions.to || !mailOptions.subject || !mailOptions.html) {
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


function getHTMLOnBoard(link, name) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
        <div style="text-align: center;">
            <img src="https://example.com/logo.png" alt="Company Logo" style="max-width: 150px; margin-bottom: 20px;">
        </div>
        <h2 style="color: #333; text-align: center;">Welcome aboard, ${name}!</h2>
        <p style="color: #555; text-align: center;">We have created your admin profile.</p>
        <p style="color: #555; text-align: center;">Click the button below to reset your password:</p>
        <div style="text-align: center;">
            <a href="${link}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">Reset Password</a>
        </div>
        <p style="color: #555; text-align: center; margin-top: 20px;">Regards,<br>Edumin Team</p>
    </div>
    `;
}


function getHTMLReset(link, name) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
        <div style="text-align: center;">
            <img src="https://example.com/logo.png" alt="Company Logo" style="max-width: 150px; margin-bottom: 20px;">
        </div>
        <h2 style="color: #333; text-align: center;">Hi, ${name}!</h2>
        <p style="color: #555; text-align: center;">Click the button below to reset your password:</p>
        <div style="text-align: center;">
            <a href="${link}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">Reset Password</a>
        </div>
        <p style="color: #555; text-align: center; margin-top: 20px;">Regards,<br>Edumin Team</p>
    </div>
    `;
}

