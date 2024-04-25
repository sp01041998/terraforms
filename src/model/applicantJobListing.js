const mongoose = require("mongoose")

const applicantsJobListingSchema = new mongoose.Schema({
    jobId : {
        type : mongoose.Types.ObjectId,
        ref : "Job"
    },
    applicantId : {
        type : String,
        trim : true
    },
    date : {
        type : Number
    },
    
    isDeleted : {
        type : Boolean,
        default : false
    }
}, {timestamps : true})

module.exports = mongoose.model("applicatsJoblisting", applicantsJobListingSchema)