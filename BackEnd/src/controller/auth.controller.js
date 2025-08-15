import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utli.js";
import User from "../models/user.model.js";

import UserResponse from "../models/userResponse.model.js"; // for dashboard

import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const {fullName,email,password, universityName, experienceLevel} = req.body
  try{
    if(!fullName || !email || !password){
      return res.status(400).json({message:"All fields are required"});
    }
    //hash password bycrypt
    if(password.length < 6){
      return res.status(400).json({message:"Password must be at least 6 characters"});
    }
    const user = await User.findOne({email})

    if (user) return res.status(400).json({message :"Mail already exists"})

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser= new User({
      fullName,
      email,
      universityName, 
      experienceLevel,
      password:hashedPassword

    })

    if(newUser){
      generateToken(newUser._id,res)
      await newUser.save();

      res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        universityName: newUser.universityName,
        experienceLevel: newUser.experienceLevel, 
      })
        }else{
           return res.status(400).json({message:"Invalid User data"});
    }

  } catch(error){
    console.log("Error in signup controller",error.message);
    res.status(500).json({message: "Internal Server Error"});

  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    
    // Check if user doesn't exist
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt","",{maxAge: 0})
    res.status(200).json({message:"Logged out successfully"})
  }catch(error){
    console.log("Error in logout controller",error.message);
    res.status(500).json({message:"Internal Server Error"});
  }
};

export const updateProfile = async (req,res) =>{
  try{
    const {profilePic, universityName, experienceLevel }= req.body;
    const userId = req.user._id;

    if(!profilePic && !universityName && !experienceLevel) {
      return res.status(400).json({message:"No fields to update"});
    }
    const updateData = {};

    // Only add the profilePic to updateData if it's provided
    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updateData.profilePic = uploadResponse.secure_url;
    }

    // Only add the universityName to updateData if it's provided
    if (universityName) {
      updateData.universityName = universityName;
    }

    // Only add the experienceLevel to updateData if it's provided
    if (experienceLevel) {
      updateData.experienceLevel = experienceLevel;
    }
   const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    res.status(200).json({message:"Update user"});
  }catch(error){
  console.log("error in update profile:",error);
   res.status(500).json({message:"Internal server error"});
  }
}

export const checkAuth =(req, res) => {
  try{
     res.status(200).json(req.user);

  }catch(error){
    console.log("Error in checkAuth controller",error.message);
    res.status(500).json({message:"Internal Server Error"});
  }
}
////////////Dashboard//////////////////////////////

// Fetch user profile with points and badges
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // user ID from decoded JWT

    // Fetch user basic details from User model
    const user = await User.findById(userId).select("-password"); // Exclude password

    // Fetch user responses from UserResponse model to calculate points and badges
    const userResponses = await UserResponse.find({ userId });

    // Calculate total points (sum of points earned in correct answers)
    const totalPoints = userResponses.reduce((acc, response) => acc + response.pointsEarned, 0);

    // Calculate badge count (based on number of correct answers)
    const badgeCount = userResponses.filter(response => response.isCorrect).length;

    res.status(200).json({
      user,
      totalPoints,
      badgeCount,
      
    });
  } catch (error) {
    console.log("Error fetching user profile with points and badges:", error);
    res.status(500).json({ message: "Failed to fetch user profile with points and badges" });
  }
};

