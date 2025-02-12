const mongoose = require("mongoose");
const { sendEmail } = require("../services/emailService");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await sendEmail(
      email,
      "Verification Email",
      `Please confirm your OTP
       Here is your OTP code: ${otp}`
    );
    console.log("Email sent successfully: ", mailResponse);
    return mailResponse
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
