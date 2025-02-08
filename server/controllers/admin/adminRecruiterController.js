const Admin = require("../../models/Admin");
const Recruiter = require("../../models/Recruiter");
const { sendEmail } = require("../../services/emailService");

const approveRecruiter = async (req, res) => {
  try {
    const recruiterId = req.params.id;
    const admin = await Admin.findById(req.user.userInfo.id);
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
    const admin = await Admin.findById(req.user.userInfo.id);
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

const getAllRecruiter = async (req, res) => {
  try {
    const { query = "", limit = 10, page = 1, days } = req.query;

    const admin = await Admin.findById(req.user.userInfo.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    let dateFilter = {};
    const today = new Date();
    let pastDate = new Date();

    if (days) {
      switch (days) {
        case "thisMonth":
          pastDate = new Date(today.getFullYear(), today.getMonth(), 1);
          break;
        case "lastMonth":
          pastDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          today.setDate(0); // Last day of last month
          break;
        case "lastYear":
          pastDate = new Date(today.getFullYear() - 1, 0, 1);
          today.setFullYear(today.getFullYear() - 1, 11, 31);
          break;
        case "last7Days":
          pastDate.setDate(today.getDate() - 7);
          break;
        case "lastDay":
          pastDate.setDate(today.getDate() - 1);
          break;
        default:
          pastDate.setDate(today.getDate() - 30); // Default last 30 days
      }
      dateFilter = { createdAt: { $gte: pastDate, $lte: today } };
    }


    const filter = query
      ? {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
          ],
        }
      : {};

    const perPage = parseInt(limit);
    const currentPage = parseInt(page);

    const recruiter = await Recruiter.find({ ...filter, ...dateFilter })
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    const totalRecruiter = await Recruiter.countDocuments({ ...filter, ...dateFilter });

    return res.json({
      recruiter,
      totalPages: Math.ceil(totalRecruiter / perPage),
      currentPage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { approveRecruiter, rejectRecruiter, getAllRecruiter };
