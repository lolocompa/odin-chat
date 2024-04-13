const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postSchema = new schema({
  author: { type: schema.Types.ObjectId, ref: "user", required: true },
  date: { type: Date, default: Date.now },
  title: String,
  content: String,
});

module.exports = mongoose.model("post", postSchema);
