const cloudinary = require("../../config/cloudinaryConfig");
const Application = require("../../models/Application");
const Job = require("../../models/Job");
const User = require("../../models/User");
const axios = require("axios");

const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.userInfo.id;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (job.status === "closed") {
      return res.status(400).json({ message: "Job is closed" });
    }

    const prvApplication = await Application.findOne({
      userId: userId,
      jobId: jobId,
    });
    if (prvApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    let resume_Url, resume_PublicId;
    try {
      if (req.file) {
        const file = req.file;
        const fileName = `${Date.now()}-${file.originalname}`;

        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "raw",
                public_id: fileName,
                folder: `job_Portal/apllication/${job.title}}`,
              },
              (error, result) => (error ? reject(error) : resolve(result))
            )
            .end(file.buffer);
        });

        resume_Url = result.secure_url;
        resume_PublicId = result.public_id;
      } else {
        if (user.profile.resume_Url) {
          const resumeFile = user.profile.resume_Url;

          const fileResponse = await axios.get(resumeFile, {
            responseType: "arraybuffer",
          });

          if (fileResponse.headers["content-type"] !== "application/pdf") {
            return res.status(400).json({ message: "File is not a PDF" });
          }

          const fileContent = fileResponse.data;
          //the file dont have an extion so explicitily add pdf extention
          const newFileName = `${Date.now()}-${job.title}.pdf`;

          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  resource_type: "raw",
                  public_id: newFileName,
                  folder: `job_Portal/apllication/${job.title}}`,
                },
                (error, result) => (error ? reject(error) : resolve(result))
              )
              .end(fileContent);
          });
          resume_Url = result.secure_url;
          resume_PublicId = result.public_id;
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to upload resume" });
    }
    const newApplication = new Application({
      userId: userId,
      jobId: jobId,
      resume_Url: resume_Url,
      resume_PublicId: resume_PublicId,
    });

    await newApplication.save();
    return res
      .status(201)
      .json({ message: "Successfully applied for the job" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update user profile" });
  }
};

const serchJob = async (req, res) => {
  try {
    const { query, location, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { company: { $regex: query, $options: "i" } },
      ];
    }
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("recruiterId", "name company.logo_Url");

    const totalJobs = await Job.countDocuments(filter);

    res.json({
      jobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: Number(page),
      totalJobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to search job" });
  }
};

const getJobById = async (req, res) => {
  try {
    const userId = req.user.userInfo.id;
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate(
      "recruiterId",
      "name company.logo"
    );
    if (!job) return res.status(404).json({ message: "Job not found" });
    const application = await Application.findOne({ userId, jobId });
    let responseData = { job, isApplayed: false };
    if (application) {
      responseData.isApplayed = true;
      responseData.apllicationStatus = application.status;
    }

    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get job by id" });
  }
};

const getDummyJob = async (req, res) => {
  try {
    const jobs = await Job.find({ status: { $ne: "closed" } })
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("recruiterId", "name company.logo");
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found" });
    }
    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get dummy job" });
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.userInfo.id;
    const jobs = await Application.find({ userId })
      .select("jobId status createdAt")
      .populate({
        path: "jobId",
        select: "title company location recruiterId status",
        populate: {
          path: "recruiterId",
          select: "company.logo_url",
        },
      });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found" });
    }
    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get applied jobs" });
  }
};

const getSavedJobs = async (req, res) => {
  try {
    const userId = req.user.userInfo.id;
    const user = await User.findById(userId).populate({
      path: "savedJobs",
      select: "title company location recruiterId status",
      populate: {
        path: "recruiterId",
        select: "company.logo_url",
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.savedJobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get saved jobs" });
  }
};

const saveJob = async (req, res) => {
  try {
    const userId = req.user.userInfo.id;
    const { jobId } = req.body;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    //save the job id in user model in saved jobs
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedJobs: jobId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "Job saved successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to save job" });
  }
};

const removeSavedJob = async (req, res) => {
  try {
    const userId = req.user.userInfo.id;
    const { jobId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedJobs: jobId } },
      { new: true }
    );

    res.status(200).json({ message: "Job removed from saved jobs" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyForJob,
  serchJob,
  getJobById,
  getDummyJob,
  getAppliedJobs,
  saveJob,
  removeSavedJob,
  getSavedJobs
};
