const mongoose = require("mongoose");

const schema = mongoose.Schema;

const commentSchema = new schema({
    author: { type: schema.Types.ObjectId, ref: "user", required: true },
    message: String,
    post_id: { type: schema.Types.ObjectId, ref: "post", required: true },
});

module.exports = mongoose.model("comments", commentSchema);
