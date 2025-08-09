import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    profilePic:{
        type: String,
        default:"",
    },
    universityName: {
      type: String,
      default: "", // optional, but you can store the university name here
    },
    experienceLevel: {
      type: String,
      default: "", // optional, you can store experience levels like 'Beginner', 'Intermediate', 'Advanced'
    },
  },
  {timestamps:true}

);

const User = mongoose.model("User",userSchema);
export default User;