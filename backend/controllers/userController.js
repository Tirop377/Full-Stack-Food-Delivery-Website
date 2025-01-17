import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from "validator";


const createToken = (id)=>{
    return jwt.sign({id}, "random#secret");//process.env.JWT_SECRET
}

//login user
const loginUser = async (req, res)=>{
    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({email});

        if(!user){
          return res.json({success:false, message:"User Doesn't exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
          return res.json({success:false, message:"Invalid Credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true, token}); 
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"});  
    }
    

}



//register user
const registerUser = async(req, res)=>{
    const {name, email, password} = req.body;

    try {
        //checking if user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message:"User already exists"})
        }

        //validating email
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        //pasword validation
        if(password.length < 6){
            return res.json({success:false, message:"Please enter a strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = userModel({
            name:name,
            email:email, 
            password : hashedPassword
        })

        
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true, token});
        

        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"});
    }

}


export {loginUser , registerUser};