import mongoose from 'mongoose';


const connectDB = async () =>{

    try {
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("Database connected successfully");
        })
    } catch (error) {
        console.log("Error: ",error.message);
    }
}

export default connectDB;