const Admin = require("../../models/Admin");
const Recruiter = require("../../models/Recruiter");
const { sendEmail } = require("../../services/emailService");

const approveRecruiter = async (req, res) => {
  try {
    const recruiterId = req.params.id;
    const admin = await Admin.findById(req.user.adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }
    recruiter.status = "approved";
    await recruiter.save();
    await sendEmail(
      recruiter.email,
      "Your account has been approved!",
      "Congratulations! Your recruiter account is now active."
    );
    return res.json({ message: "Recruiter approved successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const rejectRecruiter = async (req, res) => {
  try {
    const recruiterId = req.params.id;
    const admin = await Admin.findById(req.user.adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }
    recruiter.status = "rejected";
    await recruiter.save();
    await sendEmail(
      recruiter.email,
      "Your account has been rejected!",
      "Sorry, your recruiter account has been rejected. Please contact us for more information."
    );
    return res.json({ message: "Recruiter rejected successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { approveRecruiter, rejectRecruiter };
