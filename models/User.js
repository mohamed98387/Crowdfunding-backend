const mongoose = require("mongoose")

const UserShema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String
    },
    cin:{
        type:Number
    },
    phone:{
        type:Number
    },
    country:{
        type:String
    },
    role:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('user',UserShema)