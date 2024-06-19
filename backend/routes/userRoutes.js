const express = require("express");
const router = express.Router();
const { createUser, loginUser, requestPasswordReset, resetPassword } = require("../controllers/userController");

router.post("/createUser", createUser);
router.post("/login", loginUser);
router.post('/requestPasswordReset', requestPasswordReset);
router.post('/resetPassword', resetPassword);


module.exports = router;
