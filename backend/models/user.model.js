import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true,
    },//use this when we have to restrict the values of a field to a certain set of values or when we have options
    profile:{
        bio:{type:String},//a string filed to store users bio
        skills:[{type:String}],//an array of strings to store users skills
        resume:{type:String},//url to resume file stored in cloudinary
        company:{type:mongoose.Schema.Types.ObjectId,ref:'company'},//a reference to the company doc. it uses mongoose.Schema.Types.ObjectId to store the id of the company doc
        profilePhoto:{
            type:String,
            default:""
        }//a string field to store the url of the profile photo of the user, default is the empty string

    },


},{timestamps:true});


//model creation
export const User = mongoose.model('User',userSchema);//this line creates a mongoose model named User based on the userSchema and exports it for use in other parts of the application

//