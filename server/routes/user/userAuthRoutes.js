const express = require("express");
const { signUp, login, googleSignIn } = require("../../controllers/user/userAuthController");
const { sendOTP } = require("../../controllers/otp/otpController");
const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.post('/google-signin', googleSignIn);
router.post('/send-otp', sendOTP);

module.exports = router;
