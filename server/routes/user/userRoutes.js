const express = require("express");
const router = express.Router();
const verifyJwt = require("../../middlewares/verifyJwt");
const upload = require("../../middlewares/multer");
const {
  updateUserProfile,
  getUser,
} = require("../../controllers/user/updateProfileController");
const { applyForJob, serchJob } = require("../../controllers/user/userJobController");

router.post(
  "/updateProfile",
  verifyJwt,
  upload.single("resume"),
  updateUserProfile
);
router.get("/profile", verifyJwt, getUser);

module.exports = router;
