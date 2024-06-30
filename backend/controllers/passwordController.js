const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const user = require("../models/user");


const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const foundUser = await user.findOne({ email });

        if (!foundUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Generate and save reset token
        const resetToken = jwt.sign({ id: foundUser.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour

        await user.updateUserById(foundUser.userId, {
            resetPasswordToken: resetToken,
            resetPasswordExpiry: resetTokenExpiry
        });

        // Send reset password email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'secondhandbybytegenius@gmail.com',
                pass: 'ungc cuek vubn pacw' // Replace with your actual Gmail app password
            }
        });

        const mailOptions = {
            from: 'secondhandbybytegenius@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://localhost:4200/reset-password/${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending password reset email' });
    }
};


// router.post('/resetPassword/:token', async (req, res) => {
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log('Decoded token:', decoded);

        // Find user by reset token and ensure the token has not expired
        const foundUser = await user.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() },
        });

        if (!foundUser) {
            console.log('Invalid or expired token');
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update user's password and clear reset token fields
        await user.updateUserById(foundUser.userId, {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null
        });

        res.status(200).json({ message: 'Password successfully reset' });
    } catch (error) {
        console.error('Error resetting password:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ error: 'Token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Error resetting password' });
    }
};

module.exports = { forgotPassword, resetPassword };

