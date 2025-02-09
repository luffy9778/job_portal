require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const corsOptions = require("./config/corsOption");
const PORT = process.env.PORT || 3500;

connectDB();
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use("/welcome", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "welcome.html"));
});

//auth
app.use("/auth",require("./routes/globalAuthRoutes"))

//user
app.use("/userAuth", require("./routes/user/userAuthRoutes"));
app.use("/user", require("./routes/user/userRoutes"));
app.use("/userJob", require("./routes/user/userJobRoutes"));

//recruiter
app.use("/recruiterAuth", require("./routes/recruiter/recruiterAuthRoutes"));
app.use("/job", require("./routes/recruiter/jobRoutes"));
app.use("/application", require("./routes/recruiter/applicationRoutes"));

//admin
app.use("/adminAuth", require("./routes/admin/adminAuthRoutes"));
app.use("/admin/recruiters", require("./routes/admin/adminRecruiter"));
app.use("/admin/users", require("./routes/admin/adminUserRoutes"));

app.use("*", (req, res) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404-Page not found" });
  } else {
    res.type("txt").send("404-Page not found");
  }
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
