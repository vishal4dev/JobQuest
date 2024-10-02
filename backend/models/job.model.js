import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  

    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    requirements: [{
        type: String
    }],
    salary: {
        type: Number,
        required: true
    },
    experienceLevel:{
        type:Number,
        required:true,
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    company: {//a reference to the company doc. it uses mongoose.Schema.Types.ObjectId to store the id of the company doc: purpose-> to know which company has posted the job
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {//purpose-> to know which user has posted the job
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [//purpose-> to know which applications have been submitted for this job
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
},{timestamps:true});
export const Job = mongoose.model("Job", jobSchema);