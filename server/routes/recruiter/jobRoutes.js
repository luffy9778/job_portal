const express = require("express");
const verifyJwt = require("../../middlewares/verifyJwt");
const {
  postJob,
  updatePostedJob,
  deletePostedJob,
  getPostedJobByID,
  getPostedJobsByStatus,
  closeJobVacancy,
} = require("../../controllers/recruiter/jobController");
const router = express.Router();

router.post("/add", verifyJwt, postJob);
router.put("/update/:jobId", verifyJwt, updatePostedJob);
router.delete("/delete/:jobId", verifyJwt, deletePostedJob);
router.patch("/close/:jobId", verifyJwt, closeJobVacancy);
router.get("/", verifyJwt, getPostedJobsByStatus);
router.get("/:jobId", verifyJwt, getPostedJobByID);

module.exports = router;
