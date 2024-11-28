//business logic for user goes here
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async(req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message:"All fields are required",
                success:false
            });
        };
        
        /*
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);  */


        //check if the user already exists in the database
        const user = await User.findOne({ email }); //check if the user already exists in the database, so we used findOne method to find the user by email
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            })
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10); //hash the password using bcrypt.hash method, the first argument is the password and the second argument is the number of rounds to use to generate the salt, the higher the number the more secure the hash is, but it also takes more time to generate the hash

        //create a new user
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {

            }
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

//login controller
export const login = async(req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        };

        //check if the user exists in the database
        //used let instead of const because we will reassign the value of user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        //check if the password is correct
        const isPasswordMatch = await bcrypt.compare(password, user.password); //compare the password entered by the user with the hashed password stored in the database

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        };

        //check if the user role is correct
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does'nt exist with current role",
                success: false
            });
        };

        const tokenData = {
            userId:user._id 
        }

        //user._id is the unique identifier of the user in the database

        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
         

        //send the user data and token to the client
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,

        }

        //send or store the token in the cookie
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message:`welcome ${user.fullname}`,
            user,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

export const logout = async(req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async(req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        /* clooudinary code
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content); */

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        //check if the user already exists in the database if it does not then who is updating the profile
        const userId = req.id; //get the userId from the request object that was added by the auth middleware

        let user = await User.findById(userId); //find the user by the userId

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        //update the user profile
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        //resume comes here

        /*if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        } */

        await user.save(); //save the updated user profile

        //send the updated user profile to the client, this one is passed onto the json object

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }


        return res.status(200).json({
            message: "Profile updated successfully",
            user, //send the updated user profile to the client
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}