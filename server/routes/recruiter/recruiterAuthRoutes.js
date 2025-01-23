const express = require("express");
const { recruiterSignUp, recruiterLogin, recruiterRefresh, recruiterLogOut } = require("../../controllers/recruiter/recruiterAuthController");
const router = express.Router();

router.post("/signUp", recruiterSignUp);
router.post("/login", recruiterLogin);
router.post("/refresh",recruiterRefresh)
router.post("/logOut",recruiterLogOut)

module.exports = router;
