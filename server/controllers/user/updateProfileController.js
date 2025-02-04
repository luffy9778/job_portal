const cloudinary = require("../../config/cloudinaryConfig");
const User = require("../../models/User");

const updateUserProfile = async (req, res) => {
  try {
    const { skills, experience } = req.body;
    console.log(skills,experience);

    const userId = req.user.userInfo.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (skills && !Array.isArray(req.body.skills)) {
      return res.status(400).json({ message: "Skills must be an array" });
    }
    if (skills) {
      user.profile.skills = skills; // Overwrite with the new array, even if it's empty
    }
    if (experience) {
      if (!Array.isArray(experience)) {
        return res.status(400).json({
          message: "Invalid data format: experience must be an array",
        });
      }
    
      for (const exp of experience) {
        if (!exp.companyName?.trim() || !exp.years?.toString().trim()) {
          return res.status(400).json({
            message: "Each experience entry must include companyName and years",
          });
        }
      }
          user.profile.experience = experience;
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
    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user.userInfo.id;
    const user = await User.findById(userId).select("-password -applications");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// const updateResume = async (req, res) => {
//   try {
//     const userId = req.user.userInfo.id;
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

module.exports = { updateUserProfile, getUser };
