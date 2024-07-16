import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect(process.env.MONGO_URL)
    // await mongoose.connect('mongodb://127.0.0.1:27017/foodies')
    .then(()=>console.log('DB connected'));
}