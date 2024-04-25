const applicantJobListingModel = require("../model/applicantJobListing")
const jobModel = require("../model/jobModel")

exports.createJob = async(bodyData) => {
    const {title, description, location, deadline, mobile, email} = bodyData || {}

    const dealineDate = new Date(deadline)
    const dealineDateInMilliSec = dealineDate.getTime()

    const dataForJob = {
        title,
        description,
        location,
        deadline : dealineDateInMilliSec,
        mobile, 
        email
    }
    const isJobAlreadyExist  = await jobModel.findOne({title, description, location, deadline : dealineDateInMilliSec, mobile, email})
    if(isJobAlreadyExist){
        return {
            status : false,
            code : 400,
            message : "There's already exist a job with same details"
        }
    }
    const jobPosting = await jobModel.create(dataForJob)
    return {
        statsu : true,
        code :200,
        data : jobPosting
    }

}

exports.archievedJob = async(jobId) => {
    const updateJob = await jobModel.findOneAndUpdate(
        {_id : jobId, isDeleted : false},
        {$set : {isArchieved : true}},
        {new : true}
    )

    if(!updateJob){
        return {
            status : false,
            code : 404,
            message : "Job does not exist"
        }
    }

    return {
        status : true,
        code : 200,
        data : updateJob
    }
}

exports.getAllApplicants = async(jobId) => {
    // can he see archievd job applicants
    const isJobExist = await jobModel.findOne({_id : jobId, isDeleted : false})
    if(!isJobExist){
        return{
            status : false,
            code : 400,
            message : "Job no longer exist"
        }
    }

    const allEnrolledApplicants = await applicantJobListingModel.find({jobId, isDeleted : false})

    if(!allEnrolledApplicants.length){
        return{
            status : false,
            code : 400,
            message : "No one have enrolled in this job yet"
        }
    }

    return {
        status: true,
        code : 200,
        data : allEnrolledApplicants
    }

}

exports.getAllJobs = async() => {
    // we can filter only those jobs whome deadline is not passed
    const allJobs = await jobModel.find({isDeleted : false, isArchieved : false}).lean()
    if(!allJobs.length){
        return {
            status : false,
            code : 400,
            message : "No active jobs found"
        }
    }
    const currentTime = new Date().getTime()
    let jobs= []
    allJobs.forEach((jobData) => {
        const {deadline} = jobData || {}
        if((deadline - 21 * 24 * 60 * 60 * 1000) < currentTime){
            jobData["cardColor"] = "green"
            // jobs.push(jobData)
            return
        }
        if((deadline - 14 * 24 * 60 * 60 * 1000) < currentTime){
            jobData["cardColor"] = "yellow"
            // jobs.push(jobData)
            return
        }
        if((deadline - 3 * 24 * 60 * 60 * 1000) < currentTime){
            jobData["cardColor"] = "red"
            // jobs.push(jobData)
            return 
        }
    });

    return {
        status : true,
        code : 200,
        data : allJobs
    }
}