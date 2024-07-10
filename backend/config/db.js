import mongoose from "mongoose";


export const connectDb = async ()=>{
    await mongoose.connect('mongodb+srv://kevinbiwott83:Tirop1973.@cluster0.ydbn08r.mongodb.net/food-del').then(()=>console.log("DB connected"));
}