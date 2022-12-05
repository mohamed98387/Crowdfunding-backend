const mongoose = require("mongoose")

const FaqShema = mongoose.Schema({
    writerQuestion: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
      },
      writerAnswer: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Answer'
      }
    }, { timestamps: true })

module.exports = mongoose.model('Faq',FaqShema)