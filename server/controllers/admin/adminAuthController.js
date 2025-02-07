const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
      }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const accessToken = jwt.sign(
      { userInfo: { id: admin._id, role: admin.role } },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { id: admin._id,role:admin.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({
      message: `admin logged in successfully`,
      accessToken,
      role:admin.role
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { adminLogin };
