const jobService = require("../service/jobServivce")

exports.createJob = async(req, res) => {
    const {title, description, location, deadline, mobile, email} = req?.body || {}
    console.log(title)
    try{
        if(!title || !description || !location || !deadline || !mobile || !email){
            return res.status(400).send({status : false, message : "All fields are mandatory"})
        }
        // use regex for email validation(will do it later)
        const {status, code, data, message} = await jobService.createJob(req?.body)
        return res.status(code || 200).send({status : true, data, message})

    }catch(error){
        console.log("Error while creating a job posting", req?.body)
        return res.status(500).send({
            status : false,
            message : error?.message || error
        })
    }
}

exports.archievedJob = async(req, res) => {
    const {jobId = ''} = req?.query
    try{
        if(!jobId){
            return res.status(400).send({status : false, message : "job id is mandatory"})
        }
        const {status, code, data, message} = await jobService.archievedJob(jobId)
        return res.status(code || 200).send({status : true, data, message})

    }catch(error){
        console.log("Error while making a job posting inactive", req?.body)
        return res.status(500).send({
            status : false,
            message : error?.message || error
        })
    }
}

exports.getAllApplicants = async(req, res) => {
    const {jobId = ''} = req?.params
    try{
        if(!jobId){
            return res.status(400).send({status : false, message : "job id is mandatory"})
        }
        const {status, code, data, message} = await jobService.getAllApplicants(jobId)
        return res.status(code || 200).send({status : true, data, message})

    }catch(error){
        console.log("Error while making a job posting inactive", req?.body)
        return res.status(500).send({
            status : false,
            message : error?.message || error
        })
    }
}