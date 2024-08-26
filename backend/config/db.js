import mongoose from "mongoose";


export const connectDb = async ()=>{
    await mongoose.connect('').then(()=>console.log("DB connected"));
}