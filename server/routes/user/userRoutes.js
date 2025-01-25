const express = require("express");
const router = express.Router();
const verifyJwt= require("../../middlewares/verifyJwt");
const upload = require("../../middlewares/multer");
const {updateUserProfile } = require("../../controllers/user/updateProfileController");
const { applyForJob } = require("../../controllers/user/userJobController");

router.post("/uploadResume",verifyJwt,upload.single("resume"),updateUserProfile)
router.post("/applayJob",verifyJwt,upload.single("resume"),applyForJob)

module.exports=router