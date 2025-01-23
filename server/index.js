require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const PORT = process.env.PORT || 3500;

connectDB();
app.use(express.json());
app.use(cookieParser());

app.use("/welcome", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "welcome.html"));
});

//auth
app.use("/userAuth", require("./routes/user/userAuthRoutes"));
app.use("/recruiterAuth", require("./routes/recruiter/recruiterAuthRoutes"));

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
