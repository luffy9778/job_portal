const Job = require("../../models/Job");
const Recruiter = require("../../models/Recruiter");

const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      skills,
      experience,
      location,
      minSallary,
      maxSallary,
    } = req.body;
    if (
      !title ||
      !description ||
      !skills ||
      !experience ||
      !location ||
      !minSallary ||
      !maxSallary
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const recruiterId = req.user.recruiterId;
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(400).json({ message: "You are not a recruiter" });
    }
    const job = await Job.create({
      title: title,
      description: description,
      requirements: {
        skills: skills,
        experience: experience,
      },
      location: location,
      salary: {
        min: minSallary,
        max: maxSallary,
      },
      recruiterId,
    });
    res.status(201).json({ message: "Job posted successfully", job: job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updatePostedJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const recruiterId = req.user.recruiterId;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(400).json({ message: "You are not a recruiter" });
    }
    if (job.recruiterId.toString() !== recruiter._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this job." });
    }

    const {
      title,
      description,
      skills,
      experience,
      location,
      minSallary,
      maxSallary,
    } = req.body;

    // Update title
    if (title && title !== job.title) {
      job.title = title;
    }

    // Update description
    if (description && description !== job.description) {
      job.description = description;
    }

    // Validate and merge skills (must be an array)
    if (skills && !Array.isArray(skills)) {
      return res.status(400).json({ message: "Skills must be an array." });
    }
    if (skills?.length) {
      job.requirements.skills = Array.from(
        new Set([...job.requirements.skills, ...skills])
      );
    }

    // Update experience
    if (experience && job.requirements.experience !== experience) {
      job.requirements.experience = experience;
    }

    // Update location
    if (location && location !== job.location) {
      job.location = location;
    }

    // update salary
    if (minSallary && minSallary !== job.salary.min) {
      job.salary.min = minSallary;
    }
    if (maxSallary && maxSallary !== job.salary.max) {
      job.salary.max = maxSallary;
    }

    // Save the updated job
    const updatedJob = await job.save();

    res
      .status(200)
      .json({ message: "Job updated successfully.", job: updatedJob });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: error.message });
  }
};

const deletePostedJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const recruiterId = req.user.recruiterId;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(400).json({ message: "You are not a recruiter" });
    }
    if (job.recruiterId.toString() !== recruiter._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this job." });
    }
    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully." });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: error.message });
  }
};

const getPostedJobs = async (req, res) => {
  try {
    const recruiterId = req.user.recruiterId;
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(400).json({ message: "You are not a recruiter" });
    }
    const jobs = await Job.find({ recruiterId: recruiterId });
    res.status(200).json({ jobs: jobs });
  } catch (error) {
    console.error("Error getting jobs:", error);
    res.status(500).json({ message: error.message });
  }
};
const getPostedJobByID = async (req, res) => {
  try {
    const recruiterId = req.user.recruiterId;
    const jobId = req.params.jobId;

    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(400).json({ message: "You are not a recruiter" });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }
    if (job.recruiterId.toString() !== recruiter._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to view this job." });
    }
    res.status(200).json({ job: job });
  } catch (error) {
    console.error("Error getting job:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postJob,
  updatePostedJob,
  deletePostedJob,
  getPostedJobs,
  getPostedJobByID,
};
