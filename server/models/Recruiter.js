const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["recruiter"],
      default: "recruiter",
    },
    company: {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      logo: {
        type: String, // URL or file path of the company logo
      },
    },
    jobsPosted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job", // Reference to the Job model
      },
    ],
    isApproved: {
      type: Boolean,
      default: false, // Approval status by admin
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

module.exports = mongoose.model("Recruiter", recruiterSchema);
