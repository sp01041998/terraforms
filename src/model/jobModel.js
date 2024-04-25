const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        trim : true
    },
    description : {
        type : String,
        trim : true
    },
    location : {
        type : String,
        trim : true
    },
    deadline : {
        type : Number
    },
    mobile : {
        type : String,
        trim : true
    },
    email : {
        type : String,
        trim : true
    },
    isArchieved : {
        type : Boolean,
        default : false
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, {timestamps : true})

module.exports = mongoose.model("Job", jobSchema)