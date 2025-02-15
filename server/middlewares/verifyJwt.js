const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Recruiter = require("../models/Recruiter");

const verifyJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (decoded.userInfo.role === "user") {
      const founduser = await User.findById(decoded.userInfo.id);
      if (founduser.isBlocked) {
        return res.status(403).json({ message: "Forbidden" });
      }
    } else if (decoded.userInfo.role === "recruiter") {
      const founduser = await Recruiter.findById(decoded.userInfo.id);
      if (founduser.status === "rejected") {
        return res.status(403).json({ message: "Forbidden" });
      }
    }
    req.user = decoded;
    next();
  });
};
module.exports = verifyJwt;
