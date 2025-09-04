const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
       
    },
    password:{
        type:String,
        required:true,
       
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verficationToken:String,
    verficationTokenExpiresAt:Date,
    
},{timestamps:true})

module.exports = mongoose.model("User", userSchema);