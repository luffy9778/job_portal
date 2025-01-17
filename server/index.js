require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
app.use("/", (req, res) => {
  res.send("welcome to jobPoral Api");
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
