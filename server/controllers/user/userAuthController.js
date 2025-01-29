const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const verifyJwt = require("../../middlewares/verifyJwt");

const signUp = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.status(201).json({ message: "User created successfully", savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    const accessToken = jwt.sign(
      { userInfo: { id: user._id, role: user.role } },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { id: user._id,role:user.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", // Use lax for local dev
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({
      message: `${user.firstName} logged in successfully`,
      accessToken,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

// const logOut = async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) {
//     return res.sendStatus(204);
//   }
//   res.clearCookie("jwt", {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//   });
//   res.json({ message: "cookie cleared and logOut" });
// };

// const refresh = async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies || !cookies.jwt) {
//     return res
//       .status(401)
//       .json({ message: "Please login first , unauthorized" });
//   }
//   const refreshToken = cookies.jwt;
//   jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_SECRET,
//     async (err, user) => {
//       if (err) {
//         return res.status(403).json({ message: "Invalid token" });
//       }
//       const foundUser = await User.findById(user.userId);
//       if (!foundUser) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       const accessToken = jwt.sign(
//         { userInfo: { userId: foundUser._id, role: foundUser.role } },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: "1h" }
//       );
//       res.json({ accessToken, role: foundUser.role });
//     }
//   );
// };

module.exports = { signUp, login };
