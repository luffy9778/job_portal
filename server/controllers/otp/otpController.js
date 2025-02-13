const otpGenerator = require("otp-generator");
const OTP = require("../../models/Otp");
const User = require("../../models/User");
const jwt=require("jsonwebtoken")

//for email verification on signup
const sendOtpOnSignUp = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(400).json({ message: " User already exists" });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }
    await OTP.create({ otp, email });
    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const sendOtpForUserPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const checkUserPresent = await User.findOne({ email });
    if (!checkUserPresent) {
      return res.status(404).json({ message: "User not found" });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }
    await OTP.create({ otp, email });
    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyOtpForUserPasswordReset = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if (!otp || !email)
      return res.status(400).json({ message: "OTP and email are required" });
    const checkUserPresent = await User.findOne({ email });
    if (!checkUserPresent) {
      return res.status(404).json({ message: "User not found" });
    }
    const checkOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (checkOtp.length === 0 || checkOtp[0].otp !== otp) {
      return res.status(422).json({ message: "Invalid OTP" });
    }

    const resetToken = jwt.sign({ email }, process.env.RESET_TOKEN_SECRET, { expiresIn: "5m" });

    res.cookie("resetToken", resetToken, {
      httpOnly: true, 
      secure: false, 
      sameSite: "lax", 
      maxAge: 5 * 60 * 1000, 
    });

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { sendOtpOnSignUp,sendOtpForUserPasswordReset,verifyOtpForUserPasswordReset };
