const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        min:0
    },
    profile:{
        tpye:String
    },
    address:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);