import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
    name:{
        type: String, 
        required: true,
    },
        username:{
        type: String, 
        required: true,
        unique: true, 
    },
        password:{
        type: String, 
        required: true,
    },
    // role to distinguish admin vs regular user
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    // status can be used to show active/blocked/banned users in admin panel
    status: {
        type: String,
        enum: ["active", "inactive", "banned"],
        default: "active",
    },
   }, 
   {timestamps: true}
); 

const User = mongoose.model("User", userSchema); 
export default User;