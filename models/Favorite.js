const mongoose = require("mongoose")

const FavoriteShema = mongoose.Schema({
    userId: {
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
      projectId: {
        type: String,
      },
      title: {
        type: String,
      },
     
      category:{
        type: String,
      },
      subCategory:{
        type: String,
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
},
projectId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'project'
}
})
module.exports = mongoose.model('Favorite',FavoriteShema)