const express = require("express");
const verifyJwt = require("../../middlewares/verifyJwt");
// const {
//   approveRecruiter,
//   rejectRecruiter,
//   getAllRecruiter,
// } = require("../../controllers/admin/adminRecruiterController");
const { getAllUser,unBlockUser,blockUser } = require("../../controllers/admin/adminUserController");
const router = express.Router();

router.patch("/block/:id", verifyJwt, blockUser);
router.patch("/unblock/:id", verifyJwt, unBlockUser);
router.get("/get", verifyJwt, getAllUser);

module.exports = router;
