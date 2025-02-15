const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Recruiter = require("../models/Recruiter");
const Admin = require("../models/Admin");

const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies || !cookies.jwt) {
    return res
      .status(401)
      .json({ message: "Please login first , unauthorized" });
  }
  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      const { id, role } = decoded;
      let foundUser;
      if (role === "user") {
        foundUser = await User.findById(id);
        if(foundUser.isBlocked){
          return res.status(403).json({ message: "Your account is blocked" });
        }
      } else if (role === "recruiter") {
        foundUser = await Recruiter.findById(id);
        if(foundUser.status==="rejected"){
          return res.status(403).json({ message: "Your account is rejected" });
        }
      } else if (role === "admin") {
        foundUser = await Admin.findById(id);
      }

      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const accessToken = jwt.sign(
        { userInfo: { id: foundUser._id, role: foundUser.role } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ accessToken, role: foundUser.role });
    }
  );
};

const logOut = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.json({ message: "cookie cleared and logOut" });
};

module.exports = { refresh, logOut };
