const mongoose = require("mongoose")

const ProjectShema = mongoose.Schema({
    title:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    location:{
        type:String
    },
    picture:{
        type:String
    },
    video:{
        type:String
    },
    objective:{
        type:Number
    },
    dateLaunche:{
        type:Date
    },
    Duration:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    validation: {
        type: Boolean,
        default: false,
      },
    Reward:{
        type:Array
    },
    Risks:{
        type:String
    },
    Presentation:{
        type:Array  
    },
    smallDescription:{
        type:String
    }
})
module.exports = mongoose.model('project',ProjectShema)