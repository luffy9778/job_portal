const express = require("express");
const verifyJwt = require("../../middlewares/verifyJwt");
const {
  viewApplications,
  updateApllicationStatus,
} = require("../../controllers/recruiter/applicationController");
const router = express.Router();


router.get("/get/:jobId", verifyJwt, viewApplications);
router.patch("/status/:applicationId", verifyJwt, updateApllicationStatus);

module.exports = router;
