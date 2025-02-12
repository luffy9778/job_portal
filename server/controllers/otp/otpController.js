const otpGenerator = require("otp-generator");
const OTP = require("../../models/Otp");
const User = require("../../models/User");

const sendOTP = async (req, res) => {
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
    res.status(200).json({ message: "OTP sent successfully",otp });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { sendOTP };
