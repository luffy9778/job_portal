const cloudinary = require("../../config/cloudinaryConfig");
const Application = require("../../models/Application");
const Job = require("../../models/Job");
const User = require("../../models/User");
const axios = require("axios");

const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const { userId } = req.user.userInfo;

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

module.exports = { applyForJob };
