const express = require("express");
const router = express.Router();
const verifyJwt = require("../../middlewares/verifyJwt");
const upload = require("../../middlewares/multer");

const {
  applyForJob,
  serchJob,
  getJobById,
  getDummyJob,
  getAppliedJobs,
  removeSavedJob,
  saveJob,
  getSavedJobs,
} = require("../../controllers/user/userJobController");

router.post("/applayJob", verifyJwt, upload.single("resume"), applyForJob);
router.get("/search", verifyJwt, serchJob);
router.get("/job/:jobId", verifyJwt, getJobById);
router.get("/dummyJob", verifyJwt, getDummyJob);
router.get("/aplliedJob", verifyJwt, getAppliedJobs);
router.get("/savedJob", verifyJwt, getSavedJobs);
router.post("/save", verifyJwt, saveJob);
router.delete("/remove/:jobId", verifyJwt, removeSavedJob);

module.exports = router;
