const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3003, () => {
    console.log("Server is unning on port 3003")
})

app.use("/job", require("./route/jobRoute"))
app.use("/applicants", require("./route/leadRoute"))

mongoose.connect("mongodb+srv://sp01041998:daredevil%4097@cluster0.deqvc.mongodb.net/terraforms").then((res) => {
    console.log("mongoDb is running on port 27017")
}).catch((error) => {
    console.log(error)
})


