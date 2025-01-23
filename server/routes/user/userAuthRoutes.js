const express = require("express");
const {
  signUp,
  login,
  refresh,
  logOut,
} = require("../../controllers/user/authController");
const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logOut", logOut);

module.exports = router;
