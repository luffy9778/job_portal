const express = require("express");
const { signUp, login } = require("../../controllers/user/userAuthController");
const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
// router.get("/refresh", refresh);
// router.post("/logOut", logOut);

module.exports = router;
