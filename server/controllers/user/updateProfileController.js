const cloudinary = require("../../config/cloudinaryConfig");
const User = require("../../models/User");

const updateUserProfile = async (req, res) => {
  try {
    const { skills, experience } = req.body;
    const { userId } = req.user.userInfo;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (skills && !Array.isArray(req.body.skills)) {
      return res.status(400).json({ message: "Skills must be an array" });
    }
    if (skills?.length) {
      user.skills = Array.from(new Set([...user.skills, ...skills]));
    }
    if (experience?.length) {
      experience.forEach((exp) => {
        const existingExperience = user.experience.find(
          (i) => i.companyName === exp.companyName
        );
        if (existingExperience) {
          existingExperience.years = exp.years;
        } else {
          user.experience.push(exp);
        }
      });
    }
    if (req.file) {
      const file = req.file;

      if (user.profile.resume_PublicId) {
        const fileName = user.profile.resume_PublicId;
        try {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                { resource_type: "raw", public_id: fileName },
                (error, result) => (error ? reject(error) : resolve(result))
              )
              .end(file.buffer);
          });
          console.log(result);
          user.profile.resume_Url = result.secure_url;
        } catch (error) {
          console.log(error);
          return res
            .status(500)
            .json({ message: "Error uploading file", error });
        }
      } else {
        const fileName = `${Date.now()}-${file.originalname}`;
        try {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  resource_type: "raw",
                  public_id: fileName,
                  folder: "job_Portal/user/resume",
                },
                (error, result) => (error ? reject(error) : resolve(result))
              )
              .end(file.buffer);
          });
          console.log(result);
          user.profile.resume_Url = result.secure_url;
          user.profile.resume_PublicId = result.public_id;
        } catch (error) {
          console.log(error);
          return res
            .status(500)
            .json({ message: "Error uploading file", error });
        }
      }
    }
    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// const updateResume = async (req, res) => {
//   try {
//     const userId = req.user.userInfo.userId;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const file = req.file;
//     if (!file) {
//       return res.status(400).json({ message: "No file provided" });
//     }
//     const fileName = `${Date.now()}-${file.originalname}`;
//     try {
//       const result = await new Promise((resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream(
//             { resource_type: "raw", public_id: fileName,folder:"job_Portal/user/resume" },
//             (error, result) => (error ? reject(error) : resolve(result))
//           )
//           .end(file.buffer);
//       });
//       console.log(result);
//       user.profile.resume_Url = result.secure_url;
//       user.profile.resume_PublicId = result.public_id;
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ message: "Error uploading file", error });
//     }
//     await user.save();
//     res.json({ message: "Profile updated successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: error.message });
//   }
// };

module.exports = { updateUserProfile };
