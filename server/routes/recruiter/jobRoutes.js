const express=require("express")
const verifyJwt = require("../../middlewares/verifyJwt")
const { postJob, updatePostedJob, deletePostedJob, getPostedJobs, getPostedJobByID } = require("../../controllers/recruiter/jobController")
const router=express.Router()

router.post("/add",verifyJwt,postJob)
router.put("/update/:jobId",verifyJwt,updatePostedJob)
router.delete("/delete/:jobId",verifyJwt,deletePostedJob)
router.get("/",verifyJwt,getPostedJobs)
router.get("/:jobId",verifyJwt,getPostedJobByID)

module.exports=router