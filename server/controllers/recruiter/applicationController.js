const Application = require("../../models/Application");
const Job = require("../../models/Job");
const Recruiter = require("../../models/Recruiter");

const viewApplications = async (req, res) => {
  try {
    const recruiterId = req.user.userInfo.id;
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
        .json({ message: "Unauthorized to view this application." });
    }
    const applications = await Application.find({ jobId })
      .populate("userId", "firstName email resume phone")
      .populate("jobId", "title");

    if (!applications.length) {
      return res.status(200).json({
        message: "No applications found for this job.",
        applications: [],
      });
    }

    res.status(200).json({
      message: "Applications fetched successfully.",
      job: job.title,
      applications: applications.map((i) => ({
        id: i._id,
        applicantName: i.userId.firstName,
        applicantEmail: i.userId.email,
        applicantPhone: i.userId.phone,
        resume: i.resume_Url,
        status: i.status,
        appliedAt: i.createdAt,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateApllicationStatus = async (req, res) => {
  try {
    const recruiterId = req.user.userInfo.id;
    const applicationId = req.params.applicationId;
    const { status } = req.body;

    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(400).json({ message: "You are not a recruiter" });
    }
    const application = await Application.findById(applicationId).populate(
      "jobId"
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }
    if (application.jobId.recruiterId.toString() !== recruiterId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this application.",
      });
    }
    application.status = status;
    await application.save();
    res.status(200).json({
      message: "Application status updated successfully.",
      application: {
        id: application._id,
        status: application.status,
        updatedAt: application.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { viewApplications, updateApllicationStatus };
