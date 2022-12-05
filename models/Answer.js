const mongoose = require("mongoose")

const AnswerShema = mongoose.Schema({
    writer: {
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

module.exports = mongoose.model('Answer',AnswerShema)