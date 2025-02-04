const express = require("express");
const router = express.Router();
const verifyJwt = require("../../middlewares/verifyJwt");
const upload = require("../../middlewares/multer");

const {
  applyForJob,
  serchJob,
  getJobById,
  getDummyJob,
} = require("../../controllers/user/userJobController");

router.post("/applayJob", verifyJwt, upload.single("resume"), applyForJob);
router.get("/search", verifyJwt, serchJob);
router.get("/job/:jobId", verifyJwt, getJobById);
router.get("/dummyJob", verifyJwt, getDummyJob);

module.exports = router;
