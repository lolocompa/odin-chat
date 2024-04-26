const mongoose = require("mongoose");

const schema = mongoose.Schema;

const friendSchema = new schema({
    name: { type: String, required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model("friend", friendSchema);
