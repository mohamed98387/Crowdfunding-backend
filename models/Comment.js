const mongoose = require("mongoose")

const commentShema = mongoose.Schema({
    writer: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      },
      projectId: {
        type: String,
      },
      responseTo: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      },
      content: {
        type: String,
      }
    }, { timestamps: true })

module.exports = mongoose.model('Comment',commentShema)