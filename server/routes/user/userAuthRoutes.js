const express = require("express");
const { signUp, login, googleSignIn, resetPassword, checkResetToken } = require("../../controllers/user/userAuthController");
const {sendOtpOnSignUp, sendOtpForUserPasswordReset, verifyOtpForUserPasswordReset } = require("../../controllers/otp/otpController");
const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.post('/google-signin', googleSignIn);

router.post('/send-otp', sendOtpOnSignUp);

router.post("/forgot-password",sendOtpForUserPasswordReset)
router.post("/verify-otp",verifyOtpForUserPasswordReset)
router.get("/check-reset-token",checkResetToken)
router.post("/reset-password",resetPassword)

module.exports = router;
