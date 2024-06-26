const express = require('express')
const router = express.Router()
const jobController = require("../controller/jobController")

router.post("/", jobController.createJob)
router.put("/", jobController.archievedJob)
router.get("/:jobId", jobController.getAllApplicants)
router.get("/", jobController.getAllJobs)

module.exports=router;
