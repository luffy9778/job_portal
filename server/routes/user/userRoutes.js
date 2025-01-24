const express = require("express");
const router = express.Router();
const verifyJwt= require("../../middlewares/verifyJwt");
const upload = require("../../middlewares/multer");
const { updateResume } = require("../../controllers/user/updateProfileController");

router.post("/uploadResume",verifyJwt,upload.single("resume"),updateResume)

module.exports=router