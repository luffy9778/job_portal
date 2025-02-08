const express = require("express");
const verifyJwt = require("../../middlewares/verifyJwt");
const {
  approveRecruiter,
  rejectRecruiter,
  getAllRecruiter,
} = require("../../controllers/admin/adminRecruiterController");
const router = express.Router();

router.patch("/approve/:id", verifyJwt, approveRecruiter);
router.patch("/reject/:id", verifyJwt, rejectRecruiter);
router.get("/get", verifyJwt, getAllRecruiter);

module.exports = router;
