const express = require("express");
const verifyJwt = require("../../middlewares/verifyJwt");
const {
  viewApplications,
} = require("../../controllers/recruiter/applicationController");
const router = express.Router();


router.get("/get/:jobId", verifyJwt, viewApplications);

module.exports = router;
