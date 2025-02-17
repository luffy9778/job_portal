const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Recruiter = require("../../models/Recruiter");

const recruiterSignUp = async (req, res) => {
  const { name, email, password, companyName, companyDescription } = req.body;
  if (!name || !email || !password || !companyName || !companyDescription) {
    return res
      .status(400)
      .json({ message: "Please fill in the required fields" });
  }
  try {
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: "Email already in use." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const recruiter = new Recruiter({
      name,
      email,
      password: hashedPassword,
      company: {
        name: companyName,
        description: companyDescription,
        // logo
      },
    });
    const savedRecruiter = await recruiter.save();
    res
      .status(201)
      .json({ message: "recruiter created successfully", savedRecruiter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating recruiter" });
  }
};

const recruiterLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in the required fields" });
    }

    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    const isValidPassword = await bcrypt.compare(password, recruiter.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    if (recruiter.status === "rejected") {
      return res
        .status(403)
        .json({ message: "Your account has been blocked by the admin" });
    }

    if (recruiter.status === "pending") {
      return res.status(401).json({
        message: "Your account is currently under review. An admin will approve it soon. Please check back later.",
      });
    }

    const accessToken = jwt.sign(
      { userInfo: { id: recruiter._id, role: recruiter.role } },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { id: recruiter._id,role:recruiter.role },
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
      message: `${recruiter.name} logged in successfully`,
      accessToken,
      role:recruiter.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

// const recruiterLogOut = async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.recjwt) {
//     return res.sendStatus(204);
//   }
//   res.clearCookie("jwt", {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//   });
//   res.json({ message: "cookie cleared and logOut" });
// };

// const recruiterRefresh = async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies || !cookies.recjwt) {
//     return res
//       .status(401)
//       .json({ message: "Please login first , unauthorized" });
//   }
//   const refreshToken = cookies.recjwt;
//   jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_SECRET,
//     async (err, recruiter) => {
//       if (err) {
//         return res.status(403).json({ message: "Invalid token" });
//       }
//       const foundRecruiter = await Recruiter.findById(recruiter.recruiterId);
//       if (!foundRecruiter) {
//         return res.status(404).json({ message: "Recruiter not found" });
//       }
//       const accessToken = jwt.sign(
//         { recruiterId: foundRecruiter._id },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: "1h" }
//       );
//       res.json({ accessToken });
//     }
//   );
// };

module.exports = {
  recruiterSignUp,
  recruiterLogin,
};
