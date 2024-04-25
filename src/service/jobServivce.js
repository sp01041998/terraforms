const applicantJobListingModel = require("../model/applicantJobListing")
const jobModel = require("../model/jobModel")

exports.createJob = async(bodyData) => {
    const {title, description, location, deadline, mobile, email} = bodyData || {}

    const dealineDate = new Date(deadline)
    const milliSec = dealineDate.getTime()

    const dataForJob = {
        title,
        description,
        location,
        deadline : milliSec,
        mobile, 
        email
    }
    // check if there's alreday job exist(atleast one propwerty differ)
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
            code : 400,
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