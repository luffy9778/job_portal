const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
    profile: {
      resume_Url: {
        type: String, // URL of uploaded resume
      },
      resume_PublicId: {
        type: String,
      },
      skills: {
        type: [String], // Array of strings
      },
      experience: [
        {
          companyName: {
            type: String,
            unique: true,
          },
          years: {
            type: Number, // Number of years worked at the company
            min:1,
            // max?
          },
        },
      ],
    },
    applications: [
      {
        jobId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
        status: {
          type: String,
          enum: ["applied", "shortlisted", "rejected", "hired"],
          default: "applied",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
