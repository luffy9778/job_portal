const cloudinary = require("../../config/cloudinaryConfig");
const Application = require("../../models/Application");
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

//need to confirom updatePostedJob
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
    if (job.status !== "closed") {
      return res
        .status(400)
        .json({ message: "Only closed jobs can be deleted." });
    }

    //add batch deletion if need here
    const applications = await Application.find({ jobId: job._id });
    for (const application of applications) {
      if (application.resume_PublicId) {
        await cloudinary.uploader.destroy(application.resume_PublicId);
      }
    }
    await Application.deleteMany({ jobId: job._id });
    await job.deleteOne();
    res.status(200).json({
      message:
        "Job and associated applications (with resumes) deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: error.message });
  }
};

const getPostedJobsByStatus = async (req, res) => {
  try {
    const { status = "open", page = 1, limit = 10 } = req.query;

    const recruiterId = req.user.recruiterId;
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(400).json({ message: "You are not a recruiter" });
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const jobs = await Job.find({ recruiterId, status })
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    const totalJobs = await Job.countDocuments({ recruiterId, status });
    const totalPages = Math.ceil(totalJobs / limitNumber);

    res.status(200).json({
      jobs,
      pagination: {
        totalJobs,
        totalPages,
        currentPage: pageNumber,
        pageSize: limitNumber,
      },
    });
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

const closeJobVacancy = async (req, res) => {
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

    if (job.status !== "closed") {
      job.status = "closed";
      await job.save();
      res.status(200).json({ message: "Job vacancy closed successfully" });
    } else {
      res.status(200).json({ message: "Job is already closed" });
    }
  } catch (error) {
    console.error("Error closeing job vacancy:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postJob,
  updatePostedJob,
  deletePostedJob,
  getPostedJobsByStatus,
  getPostedJobByID,
  closeJobVacancy,
};
