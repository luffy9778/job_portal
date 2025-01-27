const express = require("express");
const verifyJwt = require("../../middlewares/verifyJwt");
const {
  approveRecruiter,
  rejectRecruiter,
} = require("../../controllers/admin/adminRecruiterController");
const router = express.Router();

router.patch("/approve/:id", verifyJwt, approveRecruiter);
router.patch("/reject/:id", verifyJwt, rejectRecruiter);

module.exports = router;
