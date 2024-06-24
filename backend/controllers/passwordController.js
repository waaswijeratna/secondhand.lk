const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const db = require("../models/db");


// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

// REQUEST PASSWORD RESET
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    db.getConnection(async (err, connection) => {
        if (err) throw err;
        const sqlSearch = "SELECT * FROM userTable WHERE email = ?";
        const search_query = connection.format(sqlSearch, [email]);

        await connection.query(search_query, async (err, result) => {
            if (err) {
                connection.release();
                return res.status(500).json({ message: 'Database query error' });
            }

            if (result.length === 0) {
                connection.release();
                return res.status(404).json({ message: 'Email not found' });
            }

            const resetToken = crypto.randomBytes(32).toString('hex');
            const hashedToken = await bcrypt.hash(resetToken, 10);
            const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

            const sqlUpdate = "UPDATE userTable SET resetToken = ?, resetTokenExpiry = ? WHERE email = ?";
            const update_query = connection.format(sqlUpdate, [hashedToken, resetTokenExpiry, email]);

            await connection.query(update_query, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).json({ message: 'Database update error' });
                }

                const resetUrl = `http://localhost:4200/resetPassword?token=${resetToken}`;

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Password Reset',
                    text: `You requested a password reset. Please click on the following link to reset your password: ${resetUrl}`
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error sending email' });
                    }

                    res.status(200).json({ message: 'Password reset email sent' });
                });
            });
        });
    });
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password are required' });
    }

    db.getConnection(async (err, connection) => {
        if (err) throw err;

        const sqlSearch = "SELECT * FROM userTable WHERE resetToken IS NOT NULL";
        await connection.query(sqlSearch, async (err, result) => {
            if (err) {
                connection.release();
                return res.status(500).json({ message: 'Database query error' });
            }

            const user = result.find(u => bcrypt.compareSync(token, u.resetToken));

            if (!user) {
                connection.release();
                return res.status(400).json({ message: 'Invalid or expired token' });
            }

            if (user.resetTokenExpiry < Date.now()) {
                connection.release();
                return res.status(400).json({ message: 'Token has expired' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const sqlUpdate = "UPDATE userTable SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE id = ?";
            const update_query = connection.format(sqlUpdate, [hashedPassword, user.id]);

            await connection.query(update_query, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).json({ message: 'Database update error' });
                }

                res.status(200).json({ message: 'Password has been reset successfully' });
            });
        });
    });
};



module.exports = { requestPasswordReset, resetPassword };
