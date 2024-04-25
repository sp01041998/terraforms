const express = require('express')
const router = express.Router()
const leadController = require("../controller/leadController")

router.post("/", leadController.enrollApplicantInJob)


module.exports=router;
