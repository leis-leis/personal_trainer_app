var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  videoLink: { type: String },
  photos : [{
    photo: {type: String},
    photoDesc: {type: String},
  }],
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
