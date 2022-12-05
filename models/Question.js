const mongoose = require("mongoose")

const QuestionShema = mongoose.Schema({
    writer: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      },
      projectId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'project'
      },
      createrId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      },
      responseTo: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      },
      content: {
        type: String,
      },
      AskerId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      },
      IdQuestion:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
      }
    }, { timestamps: true })

module.exports = mongoose.model('Question',QuestionShema)