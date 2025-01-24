const Application = require("../../models/Application");
const Job = require("../../models/Job");
const Recruiter = require("../../models/Recruiter");

const viewApplications = async (req, res) => {
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
          applicantName: i.userId.firstName,
          applicantEmail: i.userId.email,
          applicantPhone: i.userId.phone,
          resume: i.userId.resume, 
          status: i.status, 
          appliedAt: i.appliedAt,
        }))
      });
     } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
     }
};

module.exports = {viewApplications}