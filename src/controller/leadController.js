const leadService = require("../service/leadService")

exports.enrollApplicantInJob = async(req, res) => {
    const {jobId, applicantId} = req?.body || {}
    try{
        if(!jobId || !applicantId){
            return res.status(400).send({status : false, message : "job id and applicant are mandatory"})
        }
        const {status, code, data, message} = await leadService.enrollApplicantInJob(req?.body)
        return res.status(code || 200).send({status : true, data, message})

    }catch(error){
        console.log("Error while marking a student job interest in Job", req?.body)
        return res.status(500).send({
            status : false,
            message : error?.message || error
        })
    }
}
