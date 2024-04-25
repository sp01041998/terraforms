const applicantJobListingModel = require("../model/applicantJobListing")
const jobModel = require("../model/jobModel")

exports.enrollApplicantInJob = async(bodyData) => {
    const {jobId, applicantId} = bodyData || {}
    const isJobExist = await jobModel.findOne({_id : jobId, isDeleted : false})
    if(!isJobExist){
        return{
            status : false,
            code : 400,
            message : "Job no longer exist"
        }
    }

    const currentDate = new Date()
    const currentDateTime = currentDate.getTime()
    if(currentDateTime > isJobExist.deadline){
        return {
            status : false,
            code : 400,
            message : "Deadline have passed for this job"
        }
    }

    // check if already applied or not

    const isAlreadyApplied = await applicantJobListingModel.findOne({jobId, applicantId})
    if(isAlreadyApplied){
        return {
            status : false, 
            code : 400,
            message : "Already enrolled for this job"
        }
    }

    const dataForApplicationJobListing = {
        jobId,
        applicantId,
        date : currentDateTime
    }

    await applicantJobListingModel.create(dataForApplicationJobListing)

    return {
        status : true,
        code : 200
    }

}