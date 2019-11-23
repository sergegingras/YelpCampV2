const mongoose = require("mongoose");

//create the schema

var commentSchema = mongoose.Schema({
    text: String,
    author: String
})

module.exports = mongoose.model("Comment", commentSchema);