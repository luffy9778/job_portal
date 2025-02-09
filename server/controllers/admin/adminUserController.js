const Admin = require("../../models/Admin");
const User = require("../../models/User");

const getAllUser=async(req,res)=>{
    try {
       const { query = "", limit = 10, page = 1, days,status } = req.query;
   
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
   
   
       const searchFilter = query
         ? {
             $or: [
               { firstName: { $regex: query, $options: "i" } },
               { lastName: { $regex: query, $options: "i" } },
               { email: { $regex: query, $options: "i" } },
             ],
           }
         : {};
         let statusFilter = {};
         if (status === "Blocked") {
           statusFilter.isBlocked = true;
         } else if (status === "Not Blocked") {
           statusFilter.isBlocked = false;
         }
       const perPage = parseInt(limit);
       const currentPage = parseInt(page);
   
       const user = await User.find({ ...searchFilter, ...dateFilter,...statusFilter })
         .sort({ createdAt: -1 })
         .skip((currentPage - 1) * perPage)
         .limit(perPage)
         .select("email firstName lastName phone _id isBlocked");
       const totalUser = await User.countDocuments({ ...searchFilter, ...dateFilter,...statusFilter });
   
       return res.json({
         user,
         totalPages: Math.ceil(totalUser / perPage),
         currentPage,
       });
     } catch (error) {
       console.log(error);
       res.status(500).json({ message: "Internal Server Error" });
     }
}

const blockUser=async(req,res)=>{
    try{
    const userId = req.params.id;
    const admin = await Admin.findById(req.user.userInfo.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isBlocked = true;
    await user.save();
    // await sendEmail(
    //   user.email,
    //   "Your account has been approved!",
    //   "Congratulations! Your user account is now active."
    // );
    return res.json({ message: "User blocked successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const unBlockUser=async(req,res)=>{
    try{
    const userId = req.params.id;
    const admin = await Admin.findById(req.user.userInfo.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isBlocked = false;
    await user.save();
    // await sendEmail(
    //   user.email,
    //   "Your account has been approved!",
    //   "Congratulations! Your user account is now active."
    // );
    return res.json({ message: "User UnBlocked successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports={getAllUser,blockUser,unBlockUser}