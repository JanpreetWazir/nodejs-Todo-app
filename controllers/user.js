import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res) => {
    // Implement the logic to get all users
    // For example:
    const users = await User.find();
    res.status(200).json(users);
};

export const login = async (req, res) => {
   try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password" , 404 ));




    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(new ErrorHandler("Invalid Email or Password" , 404 ));


    sendCookie(user, res, `Welcome Back, ${user.name}`, 200);
   } catch (error) {
    next(error);
   }
};


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already registered" , 404 ));


    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
    
  }
};


export const getMyProfile = async (req, res) => {

   

    res.status(200).json({
        success: true,
        user:req.user,
    });
}



export const getallUserDetails = async (req, res) => {}

export const logout = async (req, res) => {

        res.status(200).cookie("token","",{
          expires:new Date(Date.now()),
          sameSite: process.env.NODE_ENV ===  "Development"?"lax":"none",
          secure: process.env.NODE_ENV ===  "Development"? false: true,
        
        })
        .json({
            success: true,
            user:req.user,
        });
    
    }
