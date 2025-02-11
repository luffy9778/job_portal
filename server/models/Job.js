const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    responsibilities:{
      type:String,
      required:true
    },
    company:{
      type: String,
      required: true,
    },
    requirements: {
      skills: {
        type: [String],
        required: true,
      },
      experience: {
        type: Number, // in years
        required: true,
        min: 0,
      },
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      min: {
        type: Number,
        required: true,
        min: 0,
      },
      max: {
        type: Number,
        required: true,
        validate: {
          validator: function (value) {
            return value >= this.salary.min;
          },
          message: "Max salary must be greater than or equal to min salary.",
        },
      },
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    },
    status:{
      type:String,
      enum: ['open', 'closed'],
      default: 'open',
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
