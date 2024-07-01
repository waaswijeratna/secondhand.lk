const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const user = require("../models/user");


const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        console.log(`Email received: ${email}`);
        const foundUser = await user.findUserByEmail(email);

        if (!foundUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate and save reset token
        const resetToken = jwt.sign({ id: foundUser.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour

        await user.updateUserById(foundUser.userId, {
            resetToken: resetToken,
            resetTokenExpiry: resetTokenExpiry
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
        http://localhost:4200/resetPassword/${resetToken}\n\n
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
    console.log('Received password:', password); 

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log('Decoded token:', decoded);

        // Find user by reset token and ensure the token has not expired
        const foundUser = await user.findOne({
            resetToken: token,
            resetTokenExpiry: Date.now()
        });

        if (!foundUser) {
            console.log('Invalid or expired token');
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        // Ensure password is provided
        if (!password) {
            console.log('Password is required');
            return res.status(400).json({ error: 'Password is required' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        console.log('Generated salt:', salt); // Log the salt generated
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update user's password and clear reset token fields
        const updateResult = await user.updateUserById(foundUser.userId, {
            password: hashedPassword,
            resetToken: null, // Clear reset token after successful password reset
            resetTokenExpiry: null
        });

        if (!updateResult) {
            console.log('Error updating user password');
            return res.status(500).json({ error: 'Error updating password' });
        }

        console.log('Password successfully reset for user:', foundUser.userId);

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

