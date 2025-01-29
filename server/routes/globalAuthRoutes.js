const express=require("express")
const { refresh, logOut } = require("../controllers/globalAuthController")
const router=express.Router()

router.post("/refresh",refresh)
router.post("/logOut",logOut)

module.exports=router