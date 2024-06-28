const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  msg_text: { type: String, required: true, maxLength : 1000},
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});


module.exports = mongoose.model("Message", MessageSchema);